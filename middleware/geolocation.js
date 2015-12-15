module.exports = function(req, res, next) {
	var geo = {
		ip: '74.125.127.100', // Just for demo convience
		countryCode: "unknown"
	};

	if(!geo.ip || geo.ip === '127.0.0.1'){
		req.geo = geo;
		next();
	} else {
		req.app.get('geolocation').getCountry(geo.ip, function(err, countryCode) {
      if (err) {
        next(err);
      } {
        geo.countryCode = countryCode;
        req.geo = geo;
        next();
      }
		});
	}
};
