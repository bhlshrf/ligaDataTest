
const app = require('express')();

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const db = require('./data/db')();
const covidRoute = require('./routes/covid')(db);
const { NotFoundRoute, GeneralExceptions } = require('./utils/middlewares');


app.use(expressLogger);

app.use('/api', covidRoute);

app.get('/api/status', (req, res) => {
    logger.debug('some debug commets');

    res.status(200).send({ status: 'working' })
});

app.use(NotFoundRoute);
app.use(GeneralExceptions(logger));

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Listening on port ${port}`));
