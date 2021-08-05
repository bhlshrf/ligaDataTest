
module.exports = function (db) {

    const router = require('express').Router();

    router.get('/countries', (req, res) => {
        const {
            page = 1,
            limit = 10,

            orderBy,
            desc,

            region_id,
        } = req.query;

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
