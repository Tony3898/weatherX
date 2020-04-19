const express = require("express");
const config = require("./config");
const style = require("./style");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const app = express();
const geoCode = require("./geocode");
const weather = require("./weather");

app.set('port', (process.env.PORT || config.port || 3000));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "www/partials"));
app.use(express.static(path.join(__dirname, "ui/assets")));

hbs.registerPartials(path.join(__dirname, "www/partials"));

class API {
    constructor() {
        this.nav = config.nav;
    }

    get = (page) => {
        app.get(page, (req, res) => {
            let pagePath = req.url;
            if (pagePath !== "/")
                pagePath = pagePath.split("/")[1];
            else
                pagePath = "index";
            if (pagePath.includes("?")) {
                pagePath = pagePath.split("?")[0];
                if (pagePath === "")
                    pagePath = "index"
            }
            if (!req.query.address) {
                fs.readFile(path.join(__dirname, "ui/pages/" + pagePath + ".html"), 'utf-8', (err, html) => {
                    res.render('header', {
                        title: this.nav.sub.filter((data) => {
                            return data.name.toLowerCase() === pagePath;
                        }).map((data) => {
                            return data.name;
                        }),
                        nav: config.nav.sub,
                        html: html,
                        query: req.query
                    });
                });
            } else {
                let options = {city: req.query.address.toString().trim()}
                geoCode.getData(options, (geoCodeError, gercodeData) => {
                    if (geoCodeError) {
                        console.log(style.error(geoCodeError));
                        res.send({
                            error: geoCodeError
                        })
                    } else {
                        console.log(gercodeData);
                        if (gercodeData.features.length > 0) {
                            options.latitude = gercodeData.features[0].center[0];
                            options.longitude = gercodeData.features[0].center[1];
                            weather.getData(options, (weatherError, weatherData) => {
                                if (weatherError) {
                                    console.log(style.error(weatherError));
                                    res.send({
                                        error: weatherError
                                    })
                                } else {
                                    res.send({
                                        location: options.city,
                                        weatherData: weatherData
                                    })
                                }
                            });
                        }
                        else
                        {
                            res.send({
                                error: "City do not exist!!"
                            })
                        }

                    }
                });
            }
        }).listen(app.get('port'), () => {
            console.log(style.success("Running on port " + app.get('port')));
        });
    };

}

global.api = new API();
module.exports = api;