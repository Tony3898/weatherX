const geoCode = require("./geocode");
const weather = require("./weather");
let options = {};

geoCode.getData(options, (err, data) => {
    console.log(data);
});

options.latitude = "42.3601";
options.longitude = "-71.058";

weather.getData(options, (err, data) => {
    console.log(data.features[0]);
});