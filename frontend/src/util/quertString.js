
const queryString = (location) => {
    var objURL = {};

    (location ?? window.location).search.replace(
        new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
        function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );

    return (name, elseValue) => {
        if (!objURL[name])
            return elseValue;
        return decodeURIComponent(objURL[name]) ?? elseValue
    };
}
export default queryString;