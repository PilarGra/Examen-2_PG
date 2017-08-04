(function(){
  angular
  .module('fctApp')
  .service('ImageService', ImageService);

  // Inicio de la función ImageService que se encarga de cargar las imágenes
  function ImageService($http){

    // Inicio del cloudObj
    var cloudObj = {
      url:'https://api.cloudinary.com/v1_1/dxnv8pnia/image/upload',
      // Inicio del data
      data:{
        upload_preset: '1Laboratorio',
        tags:'Any',
        context:'photo=test'
      } // Cierre del data
    }; // Cierre del cloudObj

    // Inicio del public_api
    var public_api = {
      getConfiguration:getConfiguration
    } // Cierre del public_api
    return public_api;

    // Inicio de la función getConfiguration
    function getConfiguration(){
      return cloudObj;
    } // Cierre de la función getConfiguration

  } // Cierre de la función ImageService

})();
