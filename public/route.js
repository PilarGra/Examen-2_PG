(function(){
  'use strict';
  angular
  .module('examRoutes', ['ui.router', 'oc.lazyLoad', 'angularCSS','ngMessages'])
  .config(configuration)


  configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configuration($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('players',{
      url : '/players',
      templateUrl: './components/players/player.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/players/player.controller.js')
        }]
      },
      controller: 'playersController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    .state('properties',{
      url : '/properties',
      templateUrl: './components/properties/property.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/properties/property.controller.js')
        }]
      },
      controller: 'propertyController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    .state('propertiesBuy',{
      url : '/propertiesBuy',
      templateUrl: './components/propertiesBuy/buy.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/propertiesBuy/buy.controller.js')
        }]
      },
      controller: 'buyController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    $urlRouterProvider.otherwise('/players');
  }//cierre de las rutas
})();
