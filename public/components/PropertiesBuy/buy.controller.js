(function(){
  angular
    .module('examApp')
    .controller('buyController',buyController);
    buyController.$inject = ['buyService','$scope','playersService','propertyService'];
    
    function buyController(buyService,$scope,playersService,propertyService){

     var vm = this;
     vm.buy  = '';
     vm.playerRel = {};
     vm.propertyRel= {};
     init();

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        buyService.getBuy().then(function(response){
          vm.buy = response.data;
        });

        playersService.getPlayers().then(function(response){
          vm.playerRel = response.data;
        });

        propertyService.getProperty().then(function(response){
          vm.propertyRel = response.data;
        });
      } // Cierre de la función init

      // Encargada de mostrar la información al usuario
      $scope.pagina = 1;
        $scope.siguiente = function() {
          $scope.pagina = 2;
        }
        $scope.anterior = function() {
          $scope.pagina = 1;
        }
        $scope.registro1 = function() {
          $scope.pagina = 1;
        }// Cierre de la encargada de mostrar la información al usuario

      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.save= function(){
        var newBuy = {
          players: vm.players,
          properties: vm.properties
        } // Cierre de newBuy

      if(vm.properties.length === 0){
         propertyService.setBuy(newBuy);
         clean();
         init();
         swal({
           type: 'success',
           title: '¡Propiedad Vendida!',
           timer: 3000,
           showConfirmButton: false
         }).then(
            function () {},
            // handling the promise rejection
             function (dismiss) {
              if (dismiss === 'timer') {
                console.log('¡Propiedad Vendida!')
              }
             }
           )
         return;
      } else{
          buyService.setBuy(newBuy).then(function (response) {
            vm.players = null;
            vm.properties = null;
          init();
          });
               swal({
                 type: 'success',
                 title: '¡Propiedad Vendida!',
                 timer: 3000,
                 showConfirmButton: false
                }).then(
                  function () {},
                  // handling the promise rejection
                  function (dismiss) {
                    if (dismiss === 'timer') {
                    console.log('Registro exitoso')
                    }
                  }
                )
               return;
            }
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pBuy){
        vm.id = pBuy._id;
        vm.players = pBuy.players;
        vm.properties = pBuy.properties;
      } // Cierre de la función getInfo

      //función que cambia botones al precionar editar
      vm.hideButton = function(){
        document.querySelector('#actualizar').classList.remove('displayNone');
        document.querySelector('#registrar').classList.add('displayNone');
      } // Cierre de la función que cambia botones al precionar editar

      // Inicio de la función update, que se encarga de devolver los datos para ser editados
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var buyPropertyEdit = {
          _id: vm.id,
          players: vm.players,
          properties: vm.properties
        } // Cierre de buyPropertyEdit
        swal({
         type: 'success',
         title: '¡Propiedad modificada correctamente!',
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
        buyService.updateBuy(buyPropertyEdit).then(function(response){
          buyService.getBuy()
            .then(function(response){
              vm.buy = response.data;
            })
            .catch(function(err){
              console.log(err);
            })
         });
        init();
        clean();
      } // Cierre de la función update
      
   // Inicio de la función DiscountPrice que es la resta los valores ----PRUEBA.
      vm.DiscountPrice = function(){
        var playersList = playersService.getPlayers();
        var buyList = buyService.getBuy();
        var disponible = 0;

        for (var i = 0; i < buyList.length; i++) {
          if (buyList[i].players = playersList[i].namePlayer) {
            disponible = playersList[i].money - buyList[i].price;
            updateDescuento(disponible);
          }
        }
      }// Cierre de la función DiscountPrice  que es la resta los valores.

     // Inicio de la función updateDescuento  que es la resta los valores en la card ----PRUEBA..
      function updateDescuento(pdisponible){
        var playersList = playersService.getPlayers();
        var buyList = buyService.getBuy();

        for (var i = 0; i < buyList.length; i++) {
          if (buyList[i].players = playersList[i].namePlayer) {
            playersList[i].money = pdisponible;
            localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
          }
        }
      }// Cierre de la función updateDescuento  que es la resta los valores en la card.

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.players = '';
        vm.properties = '';

      } // Cierre clean

    }// Cierre buyController
})();
