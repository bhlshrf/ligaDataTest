const app = require('express')();

app.get('/status', (req, res) => {
  res.send({ status: 'working' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
