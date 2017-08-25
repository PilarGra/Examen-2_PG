(function(){
  angular
    .module('examApp')
    .controller('propertyController',propertyController);
    function propertyController(propertyService,$scope){

      var vm = this;

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.properties = propertyService.getProperty();
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
        var newProperty = {
          id: vm.id,
          name: vm.name,
          position: vm.position,
          price: vm.price,
          group: vm.group,
          ownedby: vm.ownedby,
          averageProbability: vm.averageProbability
        } // Cierre de newProperty

      // intento de restringir los usuarios que se registran
      if(vm.property.length === 0){
         propertyService.setProperty(newProperty);
         clean();
         init();
         swal({
           type: 'success',
           title: '¡Propiedad Registrada!',
           timer: 3000,
           showConfirmButton: false
         })
         return;
      } else{
               propertyService.setProperty(newProperty);
               clean();
               init();
               swal({
                 type: 'success',
                 title: '¡Propiedad Registrada!',
                 timer: 3000,
                 showConfirmButton: false
               })
               return;
            }
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pProperty){
        vm.id = pProperty.id;
        vm.name = pProperty.name;
        vm.position = pProperty.position;
        vm.price = pProperty.price;
        vm.group = pProperty.group;
        vm.ownedby = pProperty.ownedby;
        vm.averageProbability = pProperty.averageProbability;
      } // Cierre de la función getInfo
      return;

      //función que cambia botones al precionar editar
      vm.hideButton = function(){
        document.querySelector('#actualizar').classList.remove('displayNone');
        document.querySelector('#registrar').classList.add('displayNone');
      } // Cierre de la función que cambia botones al precionar editar

      // Inicio de la función update, que se encarga de devolver los datos para ser editados
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var propertyEdit = {
          id: vm.id,
          name: vm.name,
          position: vm.position,
          price: vm.price,
          group: vm.group,
          ownedby: vm.ownedby,
          averageProbability: vm.averageProbability
        } // Cierre de PropertyEdit
        swal({
         type: 'success',
         title: '¡Información actualizada!',
         timer: 3000,
         showConfirmButton: false
        })
        propertyService.updateProperty(propertyEdit);
        init();
        clean();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.id = '';
        vm.name = '';
        vm.position = '';
        vm.price = '';
        vm.group = '';
        vm.ownedby = '';
        vm.averageProbability = '';
      } // Cierre de la función clean

    }// Cierre de la función PropertyController
})();
