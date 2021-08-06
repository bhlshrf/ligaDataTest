
function NotFoundRoute(req, res, next) {
    res.status(404).json({ error: 'route not found' });
}

function GeneralExceptions(logger) {
    return (err, req, res, next) => {
        logger.error('uncatched error', err);
        res.status(400).json({ error: err.message });
    }
}


function parseIntOrDefault(x, defaultValue) {
    if (!x || x == 'undefined' || isNaN(x))
        return defaultValue;
    return parseInt(x);
}


module.exports = {
    NotFoundRoute,
    GeneralExceptions,
    parseIntOrDefault,
}