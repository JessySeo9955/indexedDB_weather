
const initGeolocation = (defaultCoord) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
    }, (err) => {
        // ottawa
        resolve(defaultCoord);
    });

})

export default initGeolocation;