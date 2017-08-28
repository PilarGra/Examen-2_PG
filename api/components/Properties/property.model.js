//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PropertySchema = new mongoose.Schema({
  name: String,
  id: String,
  position: Number,
  price: Number,
  rent: Number,
  group: String,
  ownedby: Number,
  housecost: Number
});
 
module.exports = mongoose.model('Property', PropertySchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
