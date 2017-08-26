(function(){
  angular
    .module('examApp')
    .controller('playersController', playersController);
    playersController.$inject = ['playersService','$scope','ImageService','Upload'];
    
    function playersController(playersService,$scope,ImageService,Upload){

      var vm = this;
      vm.players = "";
      init();

      // Inicio de la función init 
      function init(){
        playersService.getPlayers().then(function (response) {
            vm.players = response.data;
          });

        vm.cloudObj = ImageService.getConfiguration();
      }

      $scope.pagina = 1;
        $scope.siguiente = function() {
          $scope.pagina = 2;
        }

        $scope.anterior = function() {
          $scope.pagina = 1;
        }
        $scope.registro1 = function() {
          $scope.pagina = 1;
        }

      // Inicio Presave
      vm.presave= function(newPlayer){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newPlayer.photo = data.url;
            vm.save(newPlayer);
          }); // Cierre de la función success
      } // Cierre de la función presave

      // Inicio de la función Save
      vm.save= function(){
        var newPlayer = {
          code: vm.code,
          namePlayer: vm.namePlayer,
          firstName: vm.firstName,
          alias: vm.alias,
          money: 1000,
          photo: vm.photo
        } // Cierre de newPlayer
      // Restringir los usuarios que se registran
      if(vm.players.length == 0){
         playersService.setPlayers(newPlayer);
         clean();
         init();
         swal({
           type: 'success',
           title: '¡Jugador Registrado Correctamente!',
           timer: 3000,
           showConfirmButton: false
       })
       return;
      }else{
        for(var i = 0; i < vm.players.length; i++){
          if(newPlayer.code == vm.players[i].code){
           swal({
             type: 'error',
             title: '¡La identificación ya existe, ingrese una diferente!',
             timer: 3000,
             showConfirmButton: false
         })
         return;
        } else{
            playersService.setPlayers(newPlayer);
            clean();
            init();
            swal({
             type: 'success',
             title: '¡Jugador Registrado Correctamente!',
             timer: 3000,
             showConfirmButton: false
          })
          return;
            }
          }
        }
      }// Cierre de la función save.

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pPlayer){
        vm.id = pPlayer._id;
        vm.code = pPlayer.code;
        vm.namePlayer = pPlayer.namePlayer;
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
        _id : vm.id,
        code: vm.code,
        namePlayer: vm.namePlayer,
        firstName: vm.firstName,
        alias: vm.alias,
        money: 1000,
        photo: vm.photo
      } // Cierre de playersEdit
      swal({
       type: 'success',
       title: '¡Información de jugador actualizada!',
       timer: 3000,
       showConfirmButton: false
      }).then(
          function () {},
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {
              console.log('Información actualizada')
            }
          }
        )
      playersService.updatePlayers(playersEdit).then(function(response){
        playersService.getPlayers()
          .then(function(response){
            vm.players = response.data;
          })
          .catch(function(err){
            console.log(err);
          })
        });
      init();
      clean();
    } // Cierre Update

      // Inicio de la función clean
      function clean(){
       vm.code = '';
       vm.namePlayer = '';
       vm.firstName = '';
       vm.alias = '';
       vm.money = '';
       vm.photo = '';
      } // Cierre Clean

   }// Cierre de la función Players
})();