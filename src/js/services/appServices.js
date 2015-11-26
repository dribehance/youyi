 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Youyi").factory("appServices", function($rootScope, $window, $location, $translate, $timeout, localStorageService, userServices, errorServices, toastServices, config) {
     var routeChangeStart = function(e) {
         // do something white routechangestart,eg:
         // toastServices.show();
     }
     var routeChangeSuccess = function(e, currentRoute, prevRoute) {
         // do something white routechangesuccess,eg:
         toastServices.hide();
         errorServices.hide();
         $rootScope.last_path = $rootScope.current_path || undefined;
         $rootScope.current_path = $location.path();
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
             // language cache
             if (!localStorageService.get("language")) {
                 localStorageService.set("language", "CN")
             };
             // recommand cache
             if (!localStorageService.get("recommand")) {
                 localStorageService.set("recommand", {})
             };
             // user info cache
             // localStorageService.remove("token")
             $rootScope.user = {};
             userServices.sync();
             // translate app
             $translate.use(localStorageService.get("language"));
             // index dialog tips
             $rootScope.showDialog = function() {
                 errorServices.autoHide("请下载悠译人APP使用完整的功能");
             };
             // translate
             $rootScope.translate_with_value = function(translate_value) {
                 return {
                     value: translate_value
                 };
             };
             // jump to
             $rootScope.to = function(path) {
                 $timeout(function() {
                     $location.path(path)
                 }, 0)
             }
         }
     }
 });
