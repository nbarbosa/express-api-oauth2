var express = require('express');
var router = express.Router();
var User = require('../models/user');


module.exports = function(app, router) {


  /* register a new user */
  router.route('/users')
    .post(function(req, res, next) {
      var firstName = req.body.name.first;
      var lastName = req.body.name.last;
      var password = req.body.password;
      var email = req.body.email;

      var user = new User();
      user.name.first = firstName;
      user.name.last = lastName;
      user.password = password;
      user.email = email.toLowerCase();

      user.save(function(err, user) {
        if (err) {
          return next({
            friendlyMessage: 'This e-mail address is taken. Please pick a different e-mail address.'
          });
        }

        User.findById(user._id, function(err, user) {
          if (err) {
            return next(err);
          }
          res.send(user);
        });
      });
      // end post
    });

  router.route('/users/me')
    .get(app.oauth.authorise(), function(req, res, next) {
      User.findById(req.user, function(err, user) {

        if (err) {
          return next({
            message: 'Invalid user.'
          });
        }

        if (user !== null) {
          res.send(user);
        }
      });
    });

};