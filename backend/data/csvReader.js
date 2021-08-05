const fs = require('fs');
const readline = require('readline');

function readCsvFile(path) {
    return fs.readFileSync(path)
        .toString()
        .split('\r\n')
        .slice(1)
        .filter(x => x.length > 0)
        .map(x => x.replace('"', ''))
        .map(parseCsvFile);
}

function parseCsvFile(line) {
    // "name","region","country","date","Value"
    const values = line.split(',');
    return {
        name: values[0],
        region: values[1],
        country: values[2],
        date: values[3].split(' ')[0],
        value: parseInt(values[4]),
    }
}

function groupValuesByCountryAndDate(arr) {
    return [...arr.reduce((r, o) => {
        const key = o.country + '-' + o.date;

        const item = r.get(key) || Object.assign({}, o, {
            death: 0,
            confirmed: 0,
            recovered: 0,
        });

        const property = o.name.startsWith('D') ? 'death'
            : o.name.startsWith('C') ? 'confirmed' : 'recovered';
        item[property] = o.value;

        return r.set(key, item);
    }, new Map).values()];
}

function removeRedundantProperties(arr) {
    for (const x of arr) {
        delete x.value;
        delete x.name;
    }
    return arr;
}

module.exports = function (path) {
    const data = readCsvFile(path);
    const groupedData = groupValuesByCountryAndDate(data);
    return removeRedundantProperties(groupedData);
}