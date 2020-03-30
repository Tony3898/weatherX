const express = require("express");
const config = require("./config");
const style = require("./style");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "www/partials"));
//app.use(express.static(path.join(__dirname, "ui/pages")));

hbs.registerPartials(path.join(__dirname, "www/partials"));

class API {
    constructor() {
        this.nav = config.nav;
    }

    get = (page) => {
        let pagePath = "index";
        if (page !== '/')
            pagePath = page.split("/")[1];
        console.log("current", pagePath);
        fs.readFile(path.join(__dirname, "ui/pages/" + pagePath + ".html"), 'utf-8', (err, html) => {
            fs.writeFile(path.join(__dirname, 'www/partials/page.hbs'), html, (err1) => {
                app.get(page, (req, res) => {
                    res.render('header', {
                        title: this.nav.sub.filter((data) => {
                            if (data.name === "Home")
                                data.name = "index";
                            return data.name.toLowerCase() === pagePath;

                        }).map((data) => {
                            if (data.name === 'index')
                                data.name = "Home";
                            return data.name;
                        }),
                        nav: config.nav.sub
                    });
                }).listen(config.port, () => {
                    console.log(style.success("Running on port " + config.port));
                });
            });
        });
    };

}

module.exports = new API();