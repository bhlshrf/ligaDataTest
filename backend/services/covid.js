module.exports.getCountries = function ({ db, region_id, limit, page, orderBy, desc, onResult }) {
    db.getCountries({
        region_id,
        take: limit,
        skip: (page - 1) * limit,
        orderBy,
        desc: desc?.toLowerCase() == 'true',
        onResult: countries => {
            db.getCountriesCount({
                region_id,
                onResult: count => onResult({
                    countries,
                    totalCount: count,
                })
            })
        },
    });
}

