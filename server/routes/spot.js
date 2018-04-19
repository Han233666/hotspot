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
    console.log("Connected to hotspots.");
  } else {
    console.log(error);
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
      "message":"Hotspot added successfully.",
      "ok":"ok"
    });
  }
  });
}

exports.view = function(req, res){
  var sql = "SELECT id, username, title, description, latitude, longitude FROM `spots`";
  db.query(sql, function (error, results) {
    if(results.length) {
      res.send({
        "ok":"ok",
        "message":"Hotspots retrieved.",
        "results":results,
      })
    }
    else {
      res.send({
        "message":"Unable to get Hotspots.",
      })
    }
  });
}