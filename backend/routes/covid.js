const { parseIntOrDefault } = require('./utils');

module.exports = function (db) {

    const router = require('express').Router();

    router.get('/countries', (req, res) => {
        let {
            page,
            limit,

            orderBy,
            desc,

            region_id,
        } = req.query;

        limit = parseIntOrDefault(limit, 10);
        page = parseIntOrDefault(page, 1);
        region_id = parseIntOrDefault(region_id);

        db.getCountries({
            region_id,
            take: limit,
            skip: (page - 1) * limit,
            orderBy,
            desc: desc?.toLowerCase() == 'true',
            onResult: countries => {
                db.getCountriesCount({
                    region_id,
                    onResult: count => res.status(200).send({
                        countries,
                        totalCount: count,
                    })
                })
            },
        });
    })


    router.get('/countries/:id/cases', (req, res) => {
        db.getCountryCases({
            country_id: req.params.id,
            onResult: (cases) => res.status(200).send(cases),
        });
    })

    router.get('/regions', (req, res) => {
        db.getRegions({
            onResult: (regions) => res.status(200).send(regions),
        });
    })

    return router;
}
