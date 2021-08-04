const sqlite3 = require('sqlite3').verbose();
const csvReader = require('./csvReader');

function DataLayer() {
    const sortByOptions = ['confirmed', 'recovered', 'death'];

    const db = new sqlite3.Database(':memory:');
    // const seedData = csvReader('./../data.csv');

    return Object.freeze({
        getCountries,
        init,
        seed,
        close,

    });

    function init() {
        db.run(`CREATE TABLE regions (id INTEGER PRIMARY KEY, region TEXT NOT NULL)`);

        db.run(`CREATE TABLE countries (
                id INTEGER PRIMARY KEY,
                country TEXT NOT NULL,

                region_id INTEGER,
                FOREIGN KEY (region_id) REFERENCES regions (id) ON DELETE CASCADE,
            )`);

        db.run(`CREATE TABLE cases (
                id INTEGER PRIMARY KEY,
                date TEXT NOT NULL,

                death INTEGER CHECH(death >= 0),
                confirmed INTEGER CHECH(confirmed >= 0),
                recovered INTEGER CHECH(recovered >= 0),

                country_id INTEGER,
                FOREIGN KEY (country_id) REFERENCES countries (id) ON DELETE CASCADE,
            )`);
    }

    function seed() {

        // var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
        // for (var i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i);
        // }
        // stmt.finalize();

        // db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
        //     console.log(row.id + ": " + row.info);
        // });

    }

    function close() {
        db.close();
    }


    function getCountries({
        skip = 0,
        take = 10,
        region,

        sortBy,

        descending,
    }) {

        return [
            { id: 1, country: 'Austria', date: '2021.03.01', death: 13, confirm: 20, recovery: 40 },
            { id: 2, country: 'Austria', date: '2021.03.02', death: 20, confirm: 100, recovery: 50 },
            { id: 3, country: 'Austria', date: '2021.03.03', death: 13, confirm: 20, recovery: 40 },
            { id: 4, country: 'Austria', date: '2021.03.04', death: 3, confirm: 210, recovery: 420 },
        ];
    }
}

module.exports = DataLayer();