var i18n = require('i18n-iso-countries');

var Geolocation = function(fn){
  this.resolve = fn;
};

Geolocation.prototype.getCountry = function(ip, cb) {
  this.resolve(ip, function(err, result) {
    if (err) {
      return cb(err);
    }
    if(typeof result.country.iso_code === 'undefined'){
      return cb(null, 'unknown');
    }
    cb(null, i18n.alpha2ToAlpha3(result.country.iso_code));
	});
};

module.exports = Geolocation;
