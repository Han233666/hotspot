//Import Modules
let models = require('../models');
var passport = require('passport'); // authentication
require('../config/passport/passport.js')(passport, models.user);  

exports.register = function(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    if (err) {
      return next(err) 
    }
    if (!user) {
      return res.json({message: info.message})
    }
    res.json({user, info});
  })(req, res, next);
}

exports.login = function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err) 
    }
    if (!user) {
      return res.json({message: info.message})
    }
    res.json({user, info});
  })(req, res, next);
}

exports.logout = function(req, res, next) {
  req.session.destroy(function(err) {
    res.send({ message: 'User logged out.', success: 'true' });
  });
}