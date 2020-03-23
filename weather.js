const server = require("./server");

let getData = (options, cb) => {
    options.url = 'https://api.darksky.net/forecast/8ce3214d89914dc88fb895515d41230b/' + options.latitude + ',' + options.longitude;
    server.get(options, (err, data) => {
        cb(err, data);
    });
};

module.exports = {
    getData: getData
};