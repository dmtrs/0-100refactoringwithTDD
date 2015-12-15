var express = require('express');
var app = express();

var Geolocation = require('./services/geolocation');
var geo = require('./middleware/geolocation');

app.set('geolocation', new Geolocation());
app.use(geo);

app.get('/', function (req, res) {
  console.log('GET /');
  res.json({ geo: req.geo });
});

var server = app.listen(3000, function () {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});

