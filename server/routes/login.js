var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hotspot'
});

db.connect(function(error){
  if(!error) {
    console.log("Database is connected.");
  } else {
    console.log("Error connecting to database.");
  }
});

exports.register = function(req,res){
  var users={
    "username":req.body.username,
    "password":req.body.password,
  }
  db.query('INSERT INTO users SET ?',users, function (error, results) {
  if(error) {
    console.log("error occurred",error);
    res.send({
      "message":"error occurred"
    })
  } else{
    res.send({
      "message":"user registered successfully"
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
        "message":"login successful",
        "ok":"ok"
      })
    }
    else {
      res.send({
        "message":"wrong credentials",
      })
    }
  });
}