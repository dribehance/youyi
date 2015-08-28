 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
angular.module("Youyi").factory("appServices", function($rootScope, $window, errorServices, toastServices) {
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
            $rootScope.hasNavbarBottom = true;
            $rootScope.hasNavbarTop = true;
            // backaction
            $rootScope.back = function() {
                $window.history.back();
            }
        }
    }
});
