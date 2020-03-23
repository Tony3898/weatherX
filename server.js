const https = require("https");
const chalk = require("chalk");

//initilizaling
const error = chalk.red;
const warning = chalk.keyword('orange');
const success = chalk.green;

let data = "";


const get = (options, cb) => {
    if (!options.url) {
        console.log(error("Provide an  URL!!!"));
        cb({error: "Enter an URL"}, undefined);
    } else {
        https.get(options.url, (resp) => {
            resp.on('data', chunk => {
                data += chunk;
            });
            resp.on('end', () => {
                cb(undefined, JSON.parse(data));
            });
        }).on("error", err => {
            console.log(error(err));
            cb(err, undefined);
        });
    }
};

module.exports = {
    get: get
};



