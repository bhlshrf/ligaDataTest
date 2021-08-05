
function NotFoundRoute(req, res, next) {
    res.status(404).json({ error: 'route not found' });
}

function GeneralExceptions(err, req, res, next) {
    console.error('uncatched error', err);
    res.status(400).json({ error: err.message });

}

module.exports = {
    NotFoundRoute,
    GeneralExceptions,
}