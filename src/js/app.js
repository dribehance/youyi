// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi", [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.core",
    "mobile-angular-ui.core.sharedState",
    "LocalStorageModule",
    "flow",
    "timer"
])
.config(function($routeProvider,$httpProvider,localStorageServiceProvider) {
    $routeProvider
        .when("/index", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        })
        .when("/release_task", {
            templateUrl: "release_task.html",
            reloadOnSearch: false,
            controller: releaseTaskController
        })
        .when("/tasks", {
            templateUrl: "tasks.html",
            reloadOnSearch: false,
            controller: tasksController
        })
        .when("/translators", {
            templateUrl: "translators.html",
            reloadOnSearch: false,
            controller: translatorsController
        })
        // .when("/me", {
		//     templateUrl: "me.html",
		//     reloadOnSearch: false,
		//     controller: meController,
		//     resolve: {
		//         factory:loginInterceptor
		//     }
		// })
		// .when("/signin", {
		//     templateUrl: "signin.html",
		//     reloadOnSearch: false,
		//     controller: signinController
		// })
		// .when("/signup", {
		//     templateUrl: "signup.html",
		//     reloadOnSearch: false,
		//     controller: signupController
		// })
		// .when("/forget", {
		//     templateUrl: "forget.html",
		//     reloadOnSearch: false,
		//     controller:forgetController
		// })
		// .when("/about", {
		//     templateUrl: "about.html",
		//     reloadOnSearch: false,
		//     controller:aboutController,
		//     resolve: {
		//         factory:loginInterceptor
		//     }
		// })
		// .when("/update_trade_psd", {
		//     templateUrl: "update_trade_psd.html",
		//     reloadOnSearch: false,
		//     controller: updateTradePsdController,
		//     resolve: {
		//         factory:loginInterceptor
		//     }
		// })
		// .when("/update_signin_psd", {
		//     templateUrl: "update_signin_psd.html",
		//     reloadOnSearch: false,
		//     controller: updateSigninPsdController,
		//     resolve: {
		//         factory:loginInterceptor
		//     }
		// })
        .otherwise({
            redirectTo: "/index"
        });
        // $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        // delete $httpProvider.defaults.headers.common["X-Requested-With"];
        // localStorageServiceProvider.setStorageCookie(1/50);
        // $httpProvider.interceptors.push('tokenInterceptor');

}).run(function(appServices) {
    // init event such as routechangestart...
    appServices.init();
});
