
const initGeolocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
    }, () => {
        reject();
    });

})

export default initGeolocation;