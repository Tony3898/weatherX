const express = require("express");
const config = require("./config");
const style = require("./style");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const app = express();

app.set('port', (process.env.PORT || config.port));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "www/partials"));
//app.use(express.static(path.join(__dirname, "ui/pages")));

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
            fs.readFile(path.join(__dirname, "ui/pages/" + pagePath + ".html"), 'utf-8', (err, html) => {
                fs.writeFile(path.join(__dirname, 'www/partials/page.hbs'), html, 'utf-8', (err1) => {
                    res.render('header', {
                        title: this.nav.sub.filter((data) => {
                            return data.name.toLowerCase() === pagePath;
                        }).map((data) => {
                            return data.name;
                        }),
                        nav: config.nav.sub,
                        pageData:html
                    });
                });
            });
        }).listen(app.get('port'), () => {
            console.log(style.success("Running on port " + app.get('port')));
        });
    };

}

module.exports = new API();