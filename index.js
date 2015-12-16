var express = require('express');
var app = express();

var Geolocation = require('./services/geolocation');
var geo = require('./middleware/geolocation');

var mmdbreader = require('maxmind-db-reader').openSync('./data/geo.db');

app.set('geolocation', new Geolocation(mmdbreader.getGeoData.bind(mmdbreader)));
app.use(geo);

app.get('/', function (req, res) {
  console.log('GET /');
  res.json({ geo: req.geo });
});

var server = app.listen(3000, function () {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});

