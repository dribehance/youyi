 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
angular.module("Youyi").factory("appServices", function($rootScope, $window,$location, errorServices, toastServices) {
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
    var routeChangeError = function(e, currentRoute, prevRoute){
        // do something white routechangesuccess,eg:
        // $rootScope.back();
    }
    var navBarHandler = function(e, currentRoute, prevRoute) {
        // handle navbar
        var off_bottom = $location.path().indexOf("/index") != -1 ||
                         $location.path().indexOf("/release_task") != -1 ||
                         $location.path().indexOf("/tasks") != -1 ||
                         $location.path().indexOf("/translators") != -1;
        if (off_bottom) {
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
                bottom: false
            };
            // backaction
            $rootScope.back = function() {
                $window.history.back();
            }
        }
    }
});