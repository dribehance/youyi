 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Youyi").factory("appServices", function($rootScope, $window, $location, localStorageService, userServices, errorServices, toastServices, config) {
     var routeChangeStart = function(e) {
         // do something white routechangestart,eg:
         // toastServices.show();
     }
     var routeChangeSuccess = function(e, currentRoute, prevRoute) {
         // do something white routechangesuccess,eg:
         toastServices.hide();
         errorServices.hide();
         navBarHandler(e, currentRoute, prevRoute);
     }
     var routeChangeError = function(e, currentRoute, prevRoute) {
         // do something white routechangesuccess,eg:
         // $rootScope.back();
     }
     var navBarHandler = function(e, currentRoute, prevRoute) {
         // handle navbar
         var path = $location.path();
         $rootScope.navbar.bottom = true;
         var off_bottom = path.indexOf("/index") != -1 ||
             path.indexOf("/release_task") != -1 ||
             (path.indexOf("/tasks") != -1 && path.indexOf("/tasks/") == -1) ||
             (path.indexOf("/translators") != -1 && path.indexOf("/translators/") == -1);
         if (!off_bottom) {
             // SharedState.turnOff("navbarTop");
             $rootScope.navbar.bottom = false;
         } else {
             // SharedState.turnOn("navbarTop");
             $rootScope.navbar.bottom = true;
         }

     }
     var onBackKeyDown = function() {
         $rootScope.$apply(function() {
             $rootScope.back();
         });
     }
     return {
         init: function() {
             // handle android backkeydown
             document.addEventListener("backbutton", onBackKeyDown, false);
             // {2:rootScope} binding
             $rootScope.$on("$routeChangeStart", routeChangeStart);
             $rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
             $rootScope.$on("$routeChangeError", routeChangeError);
             // init navbar 
             $rootScope.navbar = {
                 top: true,
                 bottom: true
             };
             // global cover
             $rootScope.cover = {
                 show: false,
             };
             $rootScope.staticImageUrl = config.imageUrl;
             // backaction
             $rootScope.back = function() {
                 $window.history.back();
             }
             $rootScope.go = function(path) {
                 $location.path(path);
             };
             // user info
             $rootScope.user = {};
             if (localStorageService.get("token")) {
                 userServices.info.basic({}).then(function(data) {
                     $rootScope.user = angular.extend({}, $rootScope.user, data.Result.user);
                     console.log($rootScope.user)
                 })
             }
         }
     }
 });
