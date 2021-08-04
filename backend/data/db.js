function DataLayer() {
    const sortByOptions = ['confirmed', 'recovered', 'death'];

    return Object.freeze({
        getCountry,
    });

    function getCountry({
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

