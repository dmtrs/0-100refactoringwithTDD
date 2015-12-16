var test = require('tape');
var Geolocation = require('../../services/geolocation');

test('Geolocation.getCountry() should return iso country code', function(t) {
  t.plan(1);

  var ip = '8.8.8.8';
  var expected = 'USA';

  var geo = new Geolocation(function(ip, cb) {
    cb(null, { country: { iso_code: 'US' } });
  });

  geo.getCountry(ip, function(err, actual) {
    t.same(actual, expected);
  });

});

test('Geolocation.getCountry() should return an error', function(t) {
  t.plan(1);

  var geo = new Geolocation(function(ip, cb) {
    cb(new Error('Some error'));
  });

  var expected = new Error('Some error');
  geo.getCountry(null, function(actual) {
    t.same(actual, expected);
  });
});

test('Geolocation.getCountry() should return unknown ip', function(t) {
  t.plan(1);

  var geo = new Geolocation(function(ip, cb) {
    cb(null, { country: {} });
  });

  var expected = 'unknown';
  geo.getCountry(null, function(err, actual) {
    t.same(actual, expected);
  });
});
