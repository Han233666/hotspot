var mysql = require('mysql');
/* PROVIDE CONFIGURATION FILE FOR SERVER */
var config = require('./config');
var db = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  insecureAuth : true,
});

db.connect(function(error){
  if(!error) {
    console.log("Connected to users.");
  } else {
    console.log(error);
  }
});

exports.register = function(req,res){
  var user={
    "username":req.body.username,
    "password":req.body.password,
  }
  db.query('INSERT INTO users SET ?',user, function (error, results) {
  if(error) {
    res.send({
      "message":"Error occurred"
    })
  } else{
    res.send({
      "message":"User registered successfully."
    });
  }
  });
}

exports.login = function(req, res){
  var username= req.body.username;
  var password = req.body.password;
  var sql = "SELECT id, username FROM `users` WHERE `username`='" + username + "' and password = '" + password+ "'";
  db.query(sql, function (error, results) {
    if(results.length) {
      res.send({
        "message":"User logged in succesfully.",
        "ok":"ok"
      })
    }
    else {
      res.send({
        "message":"Wrong Username or Password.",
      })
    }
  });
}