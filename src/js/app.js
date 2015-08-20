angular.module('Youyi', [
  'ngRoute',
  'mobile-angular-ui',
  'Youyi.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});