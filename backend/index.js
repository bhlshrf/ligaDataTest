
const app = require('express')();

const db = require('./data/db')();
const covidRoute = require('./routes/covid')(db);
const { NotFoundRoute, GeneralExceptions } = require('./routes/utils');


app.use('/api', covidRoute);

app.use(NotFoundRoute);
app.use(GeneralExceptions);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
