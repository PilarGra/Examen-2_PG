var PropertyBuy = require('./buy.model.js');

module.exports.save = function(req, res){
  var newPropertyBuy = new PropertyBuy({
    players: req.body.players,
    properties: req.body.properties
  });

  newPropertyBuy.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar la venta de la propiedad' + err});
    }else{
      res.json({success:true, msg:'Se registró la venta de la propiedad correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  PropertyBuy.find().then(function(propertiesbuy){
    res.send(propertiesbuy);
  })
};

module.exports.update = function(req,res){
  PropertyBuy.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, propertybuy) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});
    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
}

   
