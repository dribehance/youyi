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
        .when("/tasks/:task_id", {
            templateUrl: "task.html",
            reloadOnSearch: false,
            controller: taskController
        })
        .when("/translators", {
            templateUrl: "translators.html",
            reloadOnSearch: false,
            controller: translatorsController
        })
        .when("/translators/:translator_id", {
            templateUrl: "translator.html",
            reloadOnSearch: false,
            controller: translatorController
        })
        .when("/applicants/", {
            templateUrl: "applicants.html",
            reloadOnSearch: false,
            controller: applicantsController
        })
        .when("/recommands", {
            templateUrl: "recommands.html",
            reloadOnSearch: false,
            controller: recommandsController
        })
        .when("/me", {
		    templateUrl: "me.html",
		    reloadOnSearch: false,
		    controller: meController,
		    // resolve: {
		    //     factory:loginInterceptor
		    // }
		})
        .when("/me_info", {
            templateUrl: "me_info.html",
            reloadOnSearch: false,
            controller: meInfoController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/authen_name", {
            templateUrl: "authen_name.html",
            reloadOnSearch: false,
            controller: authenNameController
        })
        .when("/authen_language", {
            templateUrl: "authen_language.html",
            reloadOnSearch: false,
            controller: authenLanguageController
        })
        .when("/authen_industry", {
            templateUrl: "authen_industry.html",
            reloadOnSearch: false,
            controller: authenIndustryController
        })
        .when("/authen_member", {
            templateUrl: "authen_member.html",
            reloadOnSearch: false,
            controller: authenMemberController
        })
        .when("/favorite", {
            templateUrl: "favorite.html",
            reloadOnSearch: false,
            controller: favoriteController
        })
        .when("/wallet", {
            templateUrl: "wallet.html",
            reloadOnSearch: false,
            controller: walletController
        })
        .when("/messages", {
            templateUrl: "messages.html",
            reloadOnSearch: false,
            controller: messageController
        })
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
