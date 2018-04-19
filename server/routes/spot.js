var mysql = require('mysql');
/* PROVIDE CONFIGURATION FILE FOR SERVER */
var config = require('./config');
var db = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
});

db.connect(function(error){
  if(!error) {
    console.log("Connected to hotspots.");
  } else {
    console.log("Error connecting to hotspots.");
  }
});

exports.add = function(req,res){
  var spot={
    "username":req.body.username,
    "title":req.body.title,
    "description":req.body.description,
    "latitude":req.body.latitude,
    "longitude":req.body.longitude,
  }
  db.query('INSERT INTO spots SET ?',spot, function (error, results) {
  if(error) {
    res.send({
      "message":"Error occurred"
    })
  } else{
    res.send({
      "message":"Hotspot added successfully."
    });
  }
  });
}

exports.view = function(req, res){
  // var username= req.body.username;
  // var password = req.body.password;
  // var sql = "SELECT id, username FROM `users` WHERE `username`='" + username + "' and password = '" + password+ "'";
  // db.query(sql, function (error, results) {
  //   if(results.length) {
  //     res.send({
  //       "message":"login successful",
  //       "ok":"ok"
  //     })
  //   }
  //   else {
  //     res.send({
  //       "message":"wrong credentials",
  //     })
  //   }
  // });
}