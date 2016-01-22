// by dribehance <dribehance.kksdapp.com>
var settingController = function($scope, $rootScope, $translate, SharedState, facebookServices, weiboServices, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.choosen_language = {
        code: localStorageService.get("language")
    };
    $scope.languages = [{
        name: "中文",
        code: "CN"
    }, {
        name: "日本語",
        code: "JP"
    }, {
        name: "한국어",
        code: "KR"
    }, {
        name: "English",
        code: "CA"
    }];
    $scope.exit = function() {
        userServices.exit();
        facebookServices.logout();
        weiboServices.logout();
        $rootScope.back();
    }
    $scope.ajaxForm = function() {
        localStorageService.set("language", $scope.input.choosen_language.code);
        $rootScope.global_language = $scope.input.choosen_language.code;
        $translate.use(localStorageService.get("language"));
        userServices.sync();
        SharedState.turnOff("language_panel");
    }
}