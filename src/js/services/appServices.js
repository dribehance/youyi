 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Youyi").factory("appServices", function($rootScope, $filter, $window, $location, $translate, $timeout, localStorageService, userServices, errorServices, toastServices, config) {
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
                 $rootScope.to(path);
             };
             // jump to
             $rootScope.to = function(path) {
                 $timeout(function() {
                     $location.path(path).search("from", null)
                 }, 0)
             };
             // language cache
             if (!localStorageService.get("language")) {
                 $rootScope.global_language = "CN"
                 localStorageService.set("language", "CN")
             } else {
                 // translate app
                 $rootScope.global_language = localStorageService.get("language")
                 $translate.use(localStorageService.get("language"));
             }
             // recommand cache
             if (!localStorageService.get("recommand")) {
                 localStorageService.set("recommand", {})
             };
             // user info cache
             // localStorageService.remove("token")
             $rootScope.user = {};
             if (!($location.path().match("translators") == null || $location.path().match("tasks") == null)) {
                 userServices.sync();
             }
             // index dialog tips
             $rootScope.showDialog = function() {
                 var tip = $filter("translate")("Please Install UE Lives APP to Enjoy All Functions");
                 errorServices.autoHide(tip);
             };
             // translate
             $rootScope.translate_with_value = function(translate_value) {
                 return {
                     value: translate_value
                 };
             };
             // user agent
             var ua = $window.navigator.userAgent.toLowerCase();
             if (ua.indexOf("micromessenger") != -1) {
                 $rootScope.wx_browser = true;
             } else {
                 $rootScope.wx_browser = false;
             };
             // remove choose cache;
             localStorageService.remove("choosen");
             localStorageService.remove("choosen_ue")
             localStorageService.remove("cache")
         }
     }
 });