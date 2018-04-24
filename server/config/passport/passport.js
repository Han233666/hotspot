var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport,user){
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if(user){
        done(null, user.get());
      }
      else{
        done(user.errors,null);
      }
    });
  });

  passport.use('local-register', new LocalStrategy(
    {           
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, username, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({where: {username:username}}).then(function(user){
        if(user) {
          return done(null, false, {message : 'That username is already taken', success: 'false'} );
        }
        else {
          var userPassword = generateHash(password);
          var data =
          { username:username,
            password:userPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          };
          User.create(data).then(function(newUser,created){
            if(!newUser) {
              return done(null,false, {message : 'That username is already taken', success: 'false'});
            }
            if(newUser) {
              return done(null,newUser, {message: 'User registered successfully.', success: 'true'});   
            }
          });
        }
      }); 
    }
  ));
  
  //Passport Strategy
  passport.use('local-login', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, username, password, done) {
      var User = user;
      var isValidPassword = function(userpass,password){
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({ where : { username: username}}).then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Username does not exist', success: 'false' });
        }
        if (!isValidPassword(user.password,password)) {
          return done(null, false, { message: 'Incorrect password.', success: 'false' });
        }
        var userinfo = user.get();
        return done(null,userinfo,{ message: 'Login successful.', success: 'true' });
      }).catch(function(err){
      console.log("Error:",err);
      return done(null, false, { message: 'Something went wrong when logging in.', success: 'false' });
      });
    }
  ));
}