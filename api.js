const express = require("express");
const config = require("./config");
const style = require("./style");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "ui/pages")));

class API {
    constructor() {

    }

    get = (page) => {
        app.get(page, (req, res) => {
            res.send(page);
        }).listen(config.port, () => {
            console.log(style.success("Running on port " + config.port));
        });
    };

}

module.exports = new API();