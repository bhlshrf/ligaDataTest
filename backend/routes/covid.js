const { getCountries } = require('../services/covid');
const { parseIntOrDefault } = require('../utils/helper');

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

        getCountries({
            db,
            region_id: parseIntOrDefault(region_id),
            limit: parseIntOrDefault(limit, 10),
            page: parseIntOrDefault(page, 1),
            orderBy,
            desc,
            onResult: (data) => res.status(200).send(data),
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
