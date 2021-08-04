const router = require('express').Router();

const covidController = require('../controllers/covid')(db);

router.get('/data', (req, res) => {
    const {
        page,
        region,
        descending,
        sortBy,
        limit
    } = req.params;

    const countryList = covidController.getCountries({
        page,
        region,
        descending,
        sortBy,
        limit,
    });

    res.status(200).send(countryList);
})

router.get('/api/status', (req, res) => res.send({ status: 'working' }));

module.exports = router;
