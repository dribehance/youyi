// by dribehance <dribehance.kksdapp.com>
var settingController = function($scope, $rootScope, $translate, SharedState, userServices, errorServices, toastServices, localStorageService, config) {
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
        $rootScope.back();
    }
    $scope.ajaxForm = function() {
        localStorageService.set("language",$scope.input.choosen_language.code);
        $translate.use(localStorageService.get("language"));
        SharedState.turnOff("language_panel");
    }
}
