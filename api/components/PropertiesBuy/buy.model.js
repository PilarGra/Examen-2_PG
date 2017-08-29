//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PropertyBuySchema = new mongoose.Schema({
  players: String,
  properties: String
});
 
module.exports = mongoose.model('PropertyBuy', PropertyBuySchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
