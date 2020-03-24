const https = require("https");
const style = require("./style");

const get = (options, cb) => {
    let data = "";
    if (!options.url) {
        console.log(style.error("Provide an  URL!!!"));
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
            console.log(style.error(err));
            cb(err, undefined);
        });
    }
};

module.exports = {
    get: get
};



