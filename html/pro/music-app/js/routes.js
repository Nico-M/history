angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('tabsController', {
    url: '/page',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.explore', {
    url: '/index',
    views: {
      'tab1': {
        templateUrl: 'templates/explore.html',
        controller: 'exploreCtrl'
      }
    }
  })

  .state('tabsController.play', {
    url: '/play',
    views: {
      'tab2': {
        templateUrl: 'templates/play.html',
        controller: 'playCtrl'
      }
    }
  })

  .state('tabsController.search', {
    url: '/search',
    views: {
      'tab3': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page/index')

  

});