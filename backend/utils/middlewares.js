
function NotFoundRoute(req, res, next) {
    res.status(404).json({ error: 'route not found' });
}

function GeneralExceptions(logger) {
    return (err, req, res, next) => {
        logger.error('uncatched error', err);
        res.status(400).json({ error: err.message });
    }
}


module.exports = {
    NotFoundRoute,
    GeneralExceptions,
}