//Import Modules
let models = require('../models');
let Spot = models.spot;

exports.add = function(req, res, next){
  if(req.body.latitude.length === 0 || req.body.longitude.length === 0) {
    console.log('Object missing');
    res.send({ message: 'Location unknown.', success: 'false' });
  }
  else if(req.body.username.length === 0) {
    console.log('Object missing');
    res.send({ message: 'User unknown.', success: 'false' });
  }
  else if(req.body.title.length === 0 || req.body.description.length === 0) {
    console.log('Object missing');
    res.send({ message: 'Title and/or description unknown.', success: 'false' });
  }
  else {
  var data =
  { username:req.body.username,
    title:req.body.title,
    description:req.body.description,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
  };
  Spot.create(data).then(function(newSpot,created){
    if(newSpot) {
      res.send({message: 'Spot added successfully.', success: 'true'});   
    }
  })
  .catch(function(err){
    console.log("Error:",err);
    res.send({ message: 'Something went wrong when adding spot.', success: 'false' });
  });
}
}

exports.remove = function(req, res, next){
  var data =
  { username:req.body.username,
    title:req.body.title,
    description:req.body.description,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
  };
  Spot.destroy({where: data}).then(function(){
    res.send({message: 'Spot removed successfully.', success: 'true'});   
  })
  .catch(function(err){
    console.log("Error:",err);
    res.send({ message: 'Something went wrong when removing spot.', success: 'false' });
  });
}

exports.view = function(req, res, next){
  Spot.findAll({raw:true}).then(function (spot) {
    res.send({results: spot, message: 'Spots found.', success: 'true'});
  })
  .catch(function(err){
    console.log("Error:",err);
    res.send({ message: 'Something went wrong when finding spots.', success: 'false' });
  });
}

exports.user = function(req, res, next){
  Spot.findAll({where: {username:req.body.username},raw:true}).then(function (spot) {
    res.send({results: spot, message: 'Spots found.', success: 'true'});
  })
  .catch(function(err){
    console.log("Error:",err);
    res.send({ message: 'Something went wrong when finding spots.', success: 'false' });
  });
}