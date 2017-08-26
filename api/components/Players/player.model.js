//Requerimos mongoose
var mongoose = require('mongoose');
//Esquema de usuarios
var PlayerSchema = new mongoose.Schema({
  code: Number,
  namePlayer: String,
  firstName: String,
  alias: String,
  money: Number,
  photo: String
});
 
module.exports = mongoose.model('Player', PlayerSchema); //nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural
