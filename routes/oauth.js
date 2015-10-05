var express = require('express');
var router = express.Router();


module.exports = function(app, router) {

  app.all('/oauth/token', app.oauth.grant());

};