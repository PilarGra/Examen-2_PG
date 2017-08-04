(function(){
  'use strict';
  angular
  .module('testRoutes', ['ui.router', 'oc.lazyLoad', 'angularCSS','ngMessages'])
  .config(configuration)


  configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configuration($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('players',{
      url : '/players',
      templateUrl: './components/players/players.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/players/players.controller.js')
        }]
      },
      controller: 'playersController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    $urlRouterProvider.otherwise('/players');
  }//cierre de las rutas
})();
