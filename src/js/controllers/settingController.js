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
        name: "日语",
        code: "JP"
    }, {
        name: "韩语",
        code: "KR"
    }, {
        name: "英语",
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
