require('dotenv').load();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');
var mongoose = require('mongoose');

// mongoose
mongoose.connect(process.env.MONGO_URI);

// bootstrap server
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());


// allow cross domain
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Cache-Control, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.oauth = oauthserver({
  model: require('./models/oauth'),
  grants: ['password', 'refresh_token'],
  debug: true
});


// apply routes
require('./config/routes')(app);



// error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Whoops! Nothing found here.');
  err.status = 404;
  res.send(err);
});

// error handlers
app.use(app.oauth.errorHandler());


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 400);
    res.send({
      message: err.message || err.friendlyMessage,
      error: err,
      friendlyMessage: err.friendlyMessage
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 400);
  res.send({
    message: err.message || err.friendlyMessage,
    error: {}
  });
});

// don't break the proccess
process.on('uncaughtException', function(err) {
    console.log(err);
});


module.exports = app;
