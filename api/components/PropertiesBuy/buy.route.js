var express = require('express');
var router = express.Router();
var buyController = require('./buy.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_properties_buy')
  .post(function(req,res){
    buyController.save(req,res);

  });
router.route('/get_all_properties_buy')
  .get(function(req,res){
    buyController.findAll(req,res);
  });

module.exports = router;