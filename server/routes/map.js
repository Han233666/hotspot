//Import Modules
let models = require('../models');
let Spot = models.spot;

exports.add = function(req, res, next){
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
  var data =
  { username:req.body.username,
  };
  // if(data.username != null || data.username != '') {
  //   Spot.findAll({where: {username:data.username}, raw:true}).then(function (spot) {
  //     res.send({results: spot, message: 'Spots found.', success: 'true'});
  //   })
  //   .catch(function(err){
  //     console.log("Error:",err);
  //     res.send({ message: 'Something went wrong when finding spots.', success: 'false' });
  //   });
  // }
  // else {
    Spot.findAll({where: {username:req.body.username},raw:true}).then(function (spot) {
      res.send({results: spot, message: 'Spots found.', success: 'true'});
    })
    .catch(function(err){
      console.log("Error:",err);
      res.send({ message: 'Something went wrong when finding spots.', success: 'false' });
    });
  // }
}