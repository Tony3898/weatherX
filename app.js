const geoCode = require("./geocode");
const weather = require("./weather");
const style = require("./style");
const yargs = require("yargs");
const API = require('./api');


if (process.argv.length > 2) {
    let options = {};
    yargs.command({
        command: "place",
        describe: "Enter the place",
        builder: {
            city: {
                describe: "City Name",
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            options.city = argv.city;
            if (options.city.toString().trim().length > 0) {
                geoCode.getData(options, (geoCodeError, gercodeData) => {
                    if (geoCodeError) {
                        console.log(style.error(geoCodeError));
                    } else {
                        console.log(style.success(gercodeData.features[0].place_name));
                        options.latitude = gercodeData.features[0].center[0];
                        options.longitude = gercodeData.features[0].center[1];
                        weather.getData(options, (weatherError, weatherData) => {
                            if (weatherError) {
                                console.log(style.error(weatherError));
                            } else {
                                let today = new Date(weatherData.currently.time);
                                console.log(style.success(today, weatherData.currently.summary));
                            }
                        });
                    }
                });
            } else {
                console.log(style.error("PLease enter an city"));
            }
        }
    }).parse();
} else {
    API.get('/');
}


