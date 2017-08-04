(function(){
  angular
    .module('fctApp')
    .controller('playersController', playersController);
    function playersController(playersService,ImageService,Upload){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.players = playersService.getPlayers();
        vm.to = new Date();
      }init(); // Cierre de la función init

      $scope.pagina = 1;
        $scope.siguiente = function() {
          $scope.pagina++;
        }

        $scope.anterior = function() {
          $scope.pagina--;
        }
        $scope.registro1 = function() {
          $scope.pagina = 1;
        }


      // Inicio de la función presave
      vm.presave= function(newPlayer){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newPlayer.photo = data.url;
            vm.save(newPlayer);
          }); // Cierre de la función success
      } // Cierre de la función presave


      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newPlayer = {
          code: vm.code,
          name: vm.name,
          firstName: vm.firstName,
          alias: vm.alias,
          money: vm.money,
          status: 'Activo',
          photo: vm.photo
        } // Cierre de newPlayer
      // intento de restringir los usuarios que se registran
      if(vm.players.length == 0){
         playersService.setPlayers(newPlayer);
         clean();
         init();
         swal({
         type: 'success',
         title: '¡Jugador Registrado!',
         timer: 3000,
         showConfirmButton: false
       })

         return;
      }else{
        for(var i = 0; i < vm.players.length; i++){
          if(newPlayer.id == vm.players[i].id){
            swal({
           type: 'error',
           title: '¡La identificación ya existe!',
           timer: 3000,
           showConfirmButton: false
         })
             return;
          }
          else if(newPlayer.email == vm.players[i].email){
                   swal({
                  type: 'error',
                  title: '¡El correo electrónico ya existe!',
                  timer: 3000,
                  showConfirmButton: false
                })

                   return;
          }
            else{
                 playersService.setPlayers(newPlayer);
                 clean();
                 init();
                 swal({
                 type: 'success',
                 title: '¡Registro completado!',
                 timer: 3000,
                 showConfirmButton: false
               })

                 return;
            }
          }
        }

      }// Cierre de la función save.(Fabián)

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pPlayer){
      
        vm.code = pPlayer.code;
        vm.name = pPlayer.name;
        vm.firstName = pPlayer.firstName;
        vm.alias = pPlayer.alias;
        vm.money = pPlayer.money;
        vm.photo = pPlayer.photo;
      } // Cierre de la función getInfo
                              //función que cambia boton segun la información para modificar Pili
    vm.hideButton = function(){
      document.querySelector('#actualizar').classList.remove('displayNone');
      document.querySelector('#registrar').classList.add('displayNone');
    }

      // Inicio de la función update, que se encarga de devolver los datos para ser editados
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var playersEdit = {
          code: vm.code,
          name: vm.name,
          firstName: vm.firstName,
          alias: vm.alias,
          money: vm.money,
          status: 'Activo',
          photo: vm.photo
          
        } // Cierre de playersEdit
        swal({
         type: 'success',
         title: '¡Información de jugador actualizada!',
         timer: 3000,
         showConfirmButton: false
        })
        playersService.updateTeacher(playersEdit);
        init();
        clean();
      } // Cierre de la función update


      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
       vm.code = '';
       vm.name = '';
       vm.firstName = '';
       vm.alias = '';
       vm.money = '';
       vm.photo = '';
      } // Cierre de la función clean


      // Inicio de la función inactive, que se encarga de cambiar el estado del profesor
      //función que cambia el estado a inabilitado
      vm.inactive = function(pPlayer){
        var playersList = playersService.getTeachers();
          for (var i = 0; i < playersList.length; i++) {
            if (playersList[i].id == pPlayer.id) {
              playersList[i].status = 'inhabilitado';
              console.log(playersList[i].status)
            }// Cierre del if
          }// Cierre del ciclo
        playersService.updateState(playersList);
        init();
      }// Cierre funcion inative

      //función que cambia el estado a activo
      vm.active = function(pPlayer){
        var playersList = playersService.getTeachers();
          for (var i = 0; i < playersList.length; i++) {
            if (playersList[i].id == pPlayer.id) {
              playersList[i].status = 'Activo';
              console.log(playersList[i].status)
            }// Cierre del if
          }// Cierre del ciclo
        playersService.updateState(playersList);
        init();
      }// Cierre de la funcion active

      vm.logOut = function(){
        AuthService.logOut();
      }

    }// Cierre de la función playersController
})();


/*
(function(){
  angular
  .module('fctApp')
  .service('playersService', playersService);

  // Inicio de función playersService
  function playersService(){
    var players = [];
    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      updatePlayers : _updatePlayers,
      updateState: _updateState
    }; // Cierre del publicAPI
    return publicAPI;


    // Inicio de la funcion setPlayers, que se encarga de registar los datos en el localStorage
    function _setPlayers(pPlayer){
      var playersList = _getPlayers();

      playersList.push(pPlayer);
      localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
    } // Cierre de la función setPlayers


    // Inicio de la función getPlayers, que se encarga de obtener los datos más actualizados
    function _getPlayers(){
      var playersList = JSON.parse(localStorage.getItem('lsPlayersList'));
      if(playersList == null){
        playersList = players;
      } // Cierre del if
      return playersList;
    } // Cierre de la funcíon getPlayers


    // Inicio de la función updatePlayers, que se encarga de permitir la edición de datos
    function _updatePlayers(pobjPlayer){
      var playersList = _getPlayers();
      for(var i = 0; i < playersList.length; i++){
        if(playersList[i].id == pobjPlayer.id){
          playersList[i] = pobjPlayer;
        } // Cierre del if
      } // Cierre del ciclo
      localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
    }// Fin de la función updatePlayers

    //función que actualiza el estado
      function _updateState(pPlayerList){

        localStorage.setItem('lsPlayersList', JSON.stringify(pPlayerList));
      }//cierre función updateState


  }// Fin de función playersService
})();

*/
