
function controller(db) {
    return Object.freeze({
        getCountries,
        getRegions,
    });

    function getCountries({
        page = 1,
        limit = 10,
        region,
        sortBy,
        descending,
    }) {
        return db.getCountries({
            skip = (page - 1) * limit,
            top = limit,
            region,
            sortBy,
            descending,
        });
    }
}

module.exports = db => controller(db);