const sqlite3 = require('sqlite3').verbose();
const csvReader = require('./csvReader');

module.exports = function () {
    const orderByOptions = ['confirmed', 'recovered', 'death'];

    const db = new sqlite3.Database(':memory:');
    initAndSeed();

    return Object.freeze({
        getCountries,
        getCountryCases,
        getRegions,

        close: () => db.close(),
    });

    function getRegions({ onResult }) {
        const sql = `SELECT * FROM regions`;
        db.all(sql, [], (err, rows) => {
            if (err) throw err;
            onResult && onResult(rows);
        });
    }


    function getCountryCases({ country_id, onResult }) {
        const sql = `SELECT region, country, date, death, confirmed, recovered
                     FROM cases 
                     INNER JOIN countries ON countries.id = cases.country_id
                     INNER JOIN regions ON countries.region_id = regions.id
                     WHERE country_id = ?
                     ORDER BY date ASC`;
        db.all(sql, [country_id], (err, rows) => {
            if (err) throw err;
            onResult && onResult(rows);
        });
    }

    function getCountries({
        skip = 0,
        take = 10,
        region_id,

        orderBy,
        desc,

        onResult,
    }) {
        let sql = `SELECT country, SUM(death) AS death, SUM(confirmed) AS confirmed, SUM(recovered) AS recovered
                   FROM cases
                   INNER JOIN countries ON cases.country_id = countries.id`;

        if (region_id)
            sql += ' WHERE region_id = ?';

        sql += ` GROUP BY country`;

        if (orderBy && orderByOptions.includes(orderBy))
            sql += ` ORDER BY ${orderBy} ${desc ? 'DESC' : 'ASC'}`;

        sql += ` LIMIT ?  OFFSET ?;`

        db.all(sql,
            region_id ? [region_id, take, skip] : [take, skip],
            (err, rows) => {
                if (err) throw err;
                onResult && onResult(rows);
            });
    }


    function initAndSeed() {
        db.serialize(() => {
            db.run(`CREATE TABLE regions (id INTEGER PRIMARY KEY, region TEXT NOT NULL)`);

            db.run(`CREATE TABLE countries (
                id INTEGER PRIMARY KEY,
                country TEXT NOT NULL,

                region_id INTEGER,
                FOREIGN KEY (region_id) REFERENCES regions (id)
            )`);

            db.run(`CREATE TABLE cases (
                id INTEGER PRIMARY KEY,
                date TEXT NOT NULL,

                death INTEGER CHECK(death >= 0),
                confirmed INTEGER CHECK(confirmed >= 0),
                recovered INTEGER CHECK(recovered >= 0),

                country_id INTEGER,
                FOREIGN KEY (country_id) REFERENCES countries (id)
            )`);

            seed()
        });

        function seed() {
            const seedData = csvReader('./../data.csv');
            const regions = onlyUniqe(seedData, 'region');

            let country_id = 0, region_id = 0;
            for (let i = 0; i < regions.length; i++) {
                db.run(`INSERT INTO regions VALUES (${++region_id},"${regions[i]}")`);

                for (const country of onlyUniqe(seedData.filter(x => x.region == regions[i]), 'country')) {
                    db.run(`INSERT INTO countries VALUES (${++country_id},"${country}", ${region_id})`);

                    seedCasesData(seedData, country_id, country);
                }
            }
        }

        function onlyUniqe(list, prop) {
            return [...new Set(list.map(x => x[prop]))]
        }

        function seedCasesData(seedData, country_id, country) {
            const values = seedData
                .filter(x => x.country == country)
                .map(x => `("${x.date}",${x.death},${x.confirmed},${x.recovered},${country_id})`)
                .join(',');
            db.run(`INSERT INTO cases(date,death,confirmed, recovered, country_id) VALUES ${values}`);
        }
    }
}