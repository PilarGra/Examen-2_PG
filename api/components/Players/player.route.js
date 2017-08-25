var express = require('express');
var router = express.Router();
var playersController = require('./players.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_player')
  .post(function(req,res){
    playersController.save(req,res);

  });
router.route('/get_all_players')
  .get(function(req,res){
    playersController.findAll(req,res);
  });

 router.route('/update_players')
  .put(function(req, res){
    playersController.update(req,res);
 	});

module.exports = router;
