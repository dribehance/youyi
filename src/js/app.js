// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi", [
        "ngRoute",
        "mobile-angular-ui",
        "mobile-angular-ui.core",
        "mobile-angular-ui.core.sharedState",
        "LocalStorageModule",
        "flow",
        "timer",
        "pascalprecht.translate",
        "ngSanitize"
    ])
    .config(function($routeProvider, $httpProvider, $translateProvider, localStorageServiceProvider) {
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
            .when("/apply_flow", {
                templateUrl: "apply_flow.html",
                reloadOnSearch: false,
                controller: applyFlowController
            })
            .when("/:task_id/applicants/", {
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
            .when("/cash", {
                templateUrl: "cash.html",
                reloadOnSearch: false,
                controller: cashController
            })
            .when("/records", {
                templateUrl: "records.html",
                reloadOnSearch: false,
                controller: recordsController
            })
            .when("/messages", {
                templateUrl: "messages.html",
                reloadOnSearch: false,
                controller: messagesController
            })
            .when("/setting", {
                templateUrl: "setting.html",
                reloadOnSearch: false,
                controller: settingController
            })
            .when("/modify_signin_password", {
                templateUrl: "modify_signin_password.html",
                reloadOnSearch: false,
                controller: modifySigninPasswordController
            })
            .when("/modify_trade_password", {
                templateUrl: "modify_trade_password.html",
                reloadOnSearch: false,
                controller: modifyTradePasswordController
            })
            .when("/privacy", {
                templateUrl: "privacy.html",
                reloadOnSearch: false,
                controller: privacyController
            })
            .when("/usage", {
                templateUrl: "usage.html",
                reloadOnSearch: false,
                controller: usageController
            })
            .when("/about", {
                templateUrl: "about.html",
                reloadOnSearch: false,
                controller: aboutController
            })
            .when("/ad", {
                templateUrl: "ad.html",
                reloadOnSearch: false,
                controller: adController
            })
            .when("/:task_id/comment", {
                templateUrl: "comment.html",
                reloadOnSearch: false,
                controller: commentController
            })
            .when("/report", {
                templateUrl: "report.html",
                reloadOnSearch: false,
                controller: reportController
            })
            .when("/search/:kw", {
                templateUrl: "search.html",
                reloadOnSearch: false,
                controller: searchController
            })
            .when("/search/translators/:kw", {
                templateUrl: "search_translators.html",
                reloadOnSearch: false,
                controller: searchTranslatorsController
            })
            .otherwise({
                redirectTo: "/index"
            });
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
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
