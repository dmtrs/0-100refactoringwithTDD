module.exports = function(resolve) {

  return function(req, res, next) {
    var ip = req.connection.remoteAddress;
    var geo = {
      ip: (ip === '::1') ? '127.0.0.1': ip, // Just for demo convience
      countryCode: "unknown"
    };

    if(!geo.ip || geo.ip === '127.0.0.1'){
      req.geo = geo;
      next();
    } else {
      resolve(geo.ip, function(err, countryCode) {
        if (err) {
          next(err);
        } {
          geo.countryCode = countryCode;
          req.geo = geo;
          next();
        }
      });
    }
  }
};
