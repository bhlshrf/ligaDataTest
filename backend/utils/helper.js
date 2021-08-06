
module.exports.parseIntOrDefault = function (x, defaultValue) {
    if (!x || x == 'undefined' || isNaN(x))
        return defaultValue;
    return parseInt(x);
}