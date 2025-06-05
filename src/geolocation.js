
const initGeolocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
    }, () => {
        // ottawa
        resolve({ latitude: 45.424721, longitude:  -75.695000  });
    });

})

export default initGeolocation;