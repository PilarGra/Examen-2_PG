var Property = require('./property.model.js');

module.exports.save = function(req, res){
  var newProperty = new Property({
    position: req.body.position,
    price: req.body.price,
    rent: req.body.rent,
    group: req.body.group,
    ownedby: req.body.ownedby,
    housecost: req.body.housecost
  });

  newProperty.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar la propiedad' + err});
    }else{
      res.json({success:true, msg:'Se registró la propiedad correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Property.find().then(function(properties){
    res.send(properties);
  })
};

module.exports.update = function(req,res){
  Property.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, property) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});
    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
}

   
