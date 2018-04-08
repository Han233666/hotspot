var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hotspot'
});
db.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  var users={
    "username":req.body.username,
    "password":req.body.password,
  }
  db.query('INSERT INTO users SET ?',users, function (error, results) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "message":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "message":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req, res){
  var username= req.body.username;
  var password = req.body.password;
  var sql = "SELECT id, username FROM `users` WHERE `username`='"+username+"' and password = '"+password+"'"; 
  console.log('login: ',username,password);
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