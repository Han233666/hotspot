//Import Packages
var express = require('express'); // provides API
var passport = require('passport'); // authentication
var session = require('express-session'); // session authentication
var bodyParser = require('body-parser'); // extract JSON body request
var env = require('dotenv').load(); // handle environment variables

//Import Modules
var auth = require('./routes/auth.js');
var map = require('./routes/map.js')
var models = require('./models');

//Initialize App
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({secret: process.env.SECRET,resave: true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
 
//Sync Database
models.sequelize
  .sync().then(function() {
    console.log("Connected to database.");
  }).catch(function(err) {
    console.log("Unable to connect to database: ",err);
  });

//Setup Router API
let router = express.Router();
router.get('/', function(req, res) {});
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/add', map.add);
router.post('/view',map.view);
router.post('/user',map.user);
router.post('/remove',map.remove);
app.use('/api',router);

//Begin Server
app.listen(5000, function(err) {
  if (!err) {
    console.log("Server is running...");
  }
  else {
    console.log(err);
  }
});