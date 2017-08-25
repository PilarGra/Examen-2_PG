var express = require('express');
var router = express.Router();
var propertyController = require('./property.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_property')
  .post(function(req,res){
    propertyController.save(req,res);

  });
router.route('/get_all_properties')
  .get(function(req,res){
    propertyController.findAll(req,res);
  });

 router.route('/update_properties')
  .put(function(req, res){
    propertyController.update(req,res);
  });

module.exports = router;
