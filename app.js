const geoCode = require("./geocode");
const weather = require("./weather");
let options = {};

options.address = 'asansol';

geoCode.getData(options, (err, gercodeData) => {
    console.log(gercodeData.features[0].place_name);
    options.latitude = gercodeData.features[0].center[0];
    options.longitude = gercodeData.features[0].center[1];
    weather.getData(options, (err, weatherData) => {
        console.log(weatherData);
    });
});




