(function(){
  angular
    .module('examApp')
    .controller('buyController',buyController);
    function buyController(buyService,$scope,playersService,propertyService){

     var vm = this;

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.buy = buyService.getBuy();
        vm.playerRel = playersService.getPlayers();
        vm.propertyRel = propertyService.getProperty();
      }init(); // Cierre de la función init

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
          player: vm.player,
          property: vm.property
        } // Cierre de newBuy

      if(vm.buy.length === 0){
         buyService.setBuy(newBuy);
         clean();
         init();
         swal({
           type: 'success',
           title: '¡Propiedad Vendida!',
           timer: 3000,
           showConfirmButton: false
         })
         return;
      } else{
               buyService.setBuy(newBuy);
               clean();
               init();
               swal({
                 type: 'success',
                 title: '¡Propiedad Vendida!',
                 timer: 3000,
                 showConfirmButton: false
               })
               return;
            }
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pBuy){
        vm.player = pBuy.player;
        vm.property = pBuy.property;
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
        var buyEdit = {
          player: vm.player,
          property: vm.property
        } // Cierre de buyEdit
        swal({
         type: 'success',
         title: '¡Propiedad modificada correctamente!',
         timer: 3000,
         showConfirmButton: false
        })
        buyService.updateBuy(buyEdit);
        init();
        clean();
      } // Cierre de la función update

   // Inicio de la función DiscountPrice que es la resta los valores ----PRUEBA.
      vm.DiscountPrice = function(){
        var playersList = playersService.getPlayers();
        var buyList = buyService.getPurchases();
        var disponible = 0;

        for (var i = 0; i < purchasesList.length; i++) {
          if (purchasesList[i].players = playersList[i].namePlayer) {
            disponible = playersList[i].money - buyList[i].price;
            updateDescuento(disponible);
          }
        }
      }// Cierre de la función DiscountPrice  que es la resta los valores.

     // Inicio de la función updateDescuento  que es la resta los valores en la card ----PRUEBA..
      function updateDescuento(pdisponible){
        var playersList = playersService.getPlayers();
        var buyList = buyService.getPurchases();

        for (var i = 0; i < buyList.length; i++) {
          if (buyList[i].players = playersList[i].namePlayer) {
            playersList[i].money = pdisponible;
            localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
          }
        }
      }// Cierre de la función updateDescuento  que es la resta los valores en la card.

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.player = '';
        vm.property = '';

      } // Cierre clean

    }// Cierre buyController
})();
