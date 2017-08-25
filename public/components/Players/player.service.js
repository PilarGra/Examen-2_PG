(function(){
  angular
  .module('examApp')
  .service('playersService', playersService);

  // Inicio de función playersService
  function playersService($http){
    var players = [
      {
        code: 001,
        namePlayer:'Goku',
        alias: 'Kokkun',
        money: 1500,
        photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535279/goku_cqc9tb.png'
      },
      {
        code: 002,
        namePlayer:'Piccolo',
        alias: 'PikOREO',
        money: 1500,
        photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535276/piccolo_ksxdec.png'
      },
      {
        code: 003,
        namePlayer:'Logan',
        alias: 'Lovezno',
        money: 1500,
        photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535284/lobezno_o1vs9g.png'
      },
      {
        code: 004,
        namePlayer:'Bomberman',
        alias: 'Don Pepe y los Globos',
        money: 1500,
        photo:'https://res.cloudinary.com/pabskun/image/upload/v1489535282/donpepe_x9hksw.png'
      }];
      
    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      updatePlayers : _updatePlayers
    }; // Cierre del publicAPI
    return publicAPI;

    // Inicio de la funcion setPlayers, que se encarga de registar los datos en el localStorage
    function _setPlayers(pPlayer){
      return $http.post('http://localhost:3000/api/save_player',pPlayer)
    } // Cierre de la función setPlayers

    // Inicio de la función getPlayers, que se encarga de obtener los datos más actualizados
    function _getPlayers(){
      return $http.get('http://localhost:3000/api/get_all_players');
    } // Cierre de la funcíon getPlayers

    // Inicio de la función updatePlayers, que se encarga de permitir la edición de datos
    function _updatePlayers(pPlayer){
       console.log(pPlayer);
        return $http.put('http://localhost:3000/api/update_players',pPlayer);
    }// Fin de la función updatePlayers

  }// Fin de función playersService
})();
