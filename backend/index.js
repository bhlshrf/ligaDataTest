const app = require('express')();
const covidRoute = require('./routes/covid');

app.use(express.urlencoded({ extended: true }));

app.use('/api/covid', covidRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: 'route not found' });
});

app.use((err, req, res, next) => {
  console.error('uncatched error', err);
  res.status(400).json({ error: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
