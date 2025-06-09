function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
}

function isArray(list) {
    return Array.isArray(list);
}

function kelvinToCelsius(kelvin, decimal = 1) {
    if (kelvin) {
        return (kelvin - 273.15).toFixed(decimal);
    }
    return '';
}

function formatDate(timeStamp) {
    // yyyy-mm-dd
    const date = new Date(timeStamp * 1000);
    return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
}

function roundCoords(number, decimals = 3) {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

export {isEmptyObject, isArray, kelvinToCelsius, formatDate, roundCoords};