(function(){
  angular
    .module('examApp')
    .controller('propertyController',propertyController);
    function propertyController(propertyService,$scope){

      var vm = this;
      vm.property = "";
      loadProperty();

      // Inicio de la función init que es la que se inicializa de primiera
      function loadProperty(){
        propertyService.getProperty().then(function (response) {
          vm.properties = response.data;
        }); // Cierre de la función init
      }

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
          name: vm.name,
          id: vm.id,
          position: vm.position,
          price: vm.price,
          rent: vm.rent,
          group: vm.group,
          housecost: vw.housecost
        } // Cierre de newProperty

      // intento de restringir los usuarios que se registran
      if(vm.property.length === 0){
         propertyService.setProperty(newProperty);
         clean();
         loadProperty();
         swal({
           type: 'success',
           title: '¡Propiedad Registrada!',
           timer: 3000,
           showConfirmButton: false
         })
         return;
      } else{
        for(var i = 0; i < vm.property.length; i++){
          if(newProperty.id == vm.property[i].id){
           swal({
             type: 'error',
             title: '¡La identificación ya existe, ingrese una diferente!',
             timer: 3000,
             showConfirmButton: false
         })
         return;
        } else{
               propertyService.setProperty(newProperty);
               clean();
               loadProperty();
               swal({
                 type: 'success',
                 title: '¡Propiedad Registrada!',
                 timer: 3000,
                 showConfirmButton: false
               })
               return;
            }
          }
        }
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pProperty){
        vm.id = pProperty._id;
        vm.name = pProperty.name;
        vm.id = pProperty._id;
        vm.position = pProperty.position;
        vm.price = pProperty.price;
        vm.rent = pProperty.rent;
        vm.group = pProperty.group;
        vm.housecost = pProperty.housecost;
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
        var propertyEdit = {
          _id: vm.id,
          name: vm.name,
          id: vm.id,
          position: vm.position,
          price: vm.price,
          rent: vm.rent,
          group: vm.group,
          housecost: vm.housecost
        } // Cierre de PropertyEdit
        swal({
         type: 'success',
         title: '¡Información actualizada!',
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
        propertyService.updateProperty(propertyEdit).then(function(response){
          propertyService.getProperty()
            .then(function(response){
              vm.property = response.data;
            })
            .catch(function(err){
              console.log(err);
            })
          });
        loadProperty();
        clean();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.name = '';
        vm.id = '';
        vm.position = '';
        vm.price = '';
        vm.rent = '';
        vm.group = '';
        vm.housecost = '';
      } // Cierre de la función clean

    }// Cierre de la función PropertyController
})();
