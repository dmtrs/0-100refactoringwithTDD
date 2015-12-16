var test = require('tape');
var geolocation = require('../../middleware/geolocation');

test('middleware should add geo body in req', function(t) {
  t.plan(1);

  var resolve = function(ip, cb) {
    cb(null, "USA");
  };
  var middleware = geolocation(resolve);

  var actual = {
    connection: {
      remoteAddress: '8.8.8.8'
    }
  };
  var expected = {
    geo: {
      ip: '8.8.8.8',
      countryCode: 'USA'
    }
  };

  middleware(actual, {}, function() {
    t.same(actual.geo, expected.geo);
  });
});

test('middleware should return unknown for localhost', function(t) {
  t.plan(1);

  var middleware = geolocation(function() {});

  var actual = { connection: { remoteAddress: '::1' } };
  var expected = { geo: { ip: '127.0.0.1', countryCode: 'unknown' } };

  middleware(actual, {}, function() {
    t.same(actual.geo, expected.geo);
  });
});
