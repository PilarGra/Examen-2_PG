var Player = require('./player.route.js.model.js');

module.exports.save = function(req, res){
  var newPlayer = new Player({
    code: req.body.code,
    namePlayer: req.body.namePlayer,
    firstName: req.body.firstName,
    alias: req.body.alias,
    photo: req.body.photo
  });

  newPlayer.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el jugador' + err});
    }else{
      res.json({success:true, msg:'Se registró el jugador correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Player.find().then(function(players){
    res.send(players);
  })
};

module.exports.update = function(req,res){

  Player.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, player) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
