Alloy.Globals.FB = require('facebook');
Alloy.Globals.PW = require('progressWindow');
Alloy.Globals.Map = require('ti.map');
// if twitter is not loaded/initialized
if (!Alloy.Globals.TW) {
var TAP = Ti.App.Properties;
Alloy.Globals.TW = require('social_wiley').create({
consumerSecret : TAP.getString('twitter.consumerSecret'),
consumerKey : TAP.getString('twitter.consumerKey')
});
}