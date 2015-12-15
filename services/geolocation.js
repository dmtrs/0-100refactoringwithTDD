var mmdbreader = require('maxmind-db-reader');
var i18n = require("i18n-iso-countries");

var Geolocation = function(){
  this.countries = mmdbreader.openSync('./data/geo.db');
};

Geolocation.prototype.getCountry = function(ip, cb) {
  this.countries.getGeoData(ip, function(err, result) {
    if (err) {
      return cb(err);
    }
    if(typeof result.country.iso_code === 'undefined'){
      return cb(null, "unkown");
    }
    cb(null, i18n.alpha2ToAlpha3(result.country.iso_code));
	});
};

module.exports = Geolocation;
