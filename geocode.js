const server = require("./server");

let getData = (options, cb) => {
    options.url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(options.address) + '.json?access_token=pk.eyJ1IjoidG9ueTM4OTgiLCJhIjoiY2s4M2hha29qMHo2eDNubXNycjF3em9reCJ9.n7xpnWitNDhuxsMmX6DDDQ';
    server.get(options, cb);
};

module.exports = {
    getData: getData
};