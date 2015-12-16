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
