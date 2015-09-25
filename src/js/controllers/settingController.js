// by dribehance <dribehance.kksdapp.com>
var settingController = function($scope, $rootScope, $translate,SharedState, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.choosen_language = "";
    $scope.languages = [{
        name: "中文",
        code: "CN"
    }, {
        name: "日语",
        code: "JP"
    }, {
        name: "韩语",
        code: "KO"
    }, {
        name: "英语",
        code: "EN"
    }];
    $scope.exit = function() {
        userServices.exit();
        $rootScope.back();
    }
    $scope.ajaxForm = function() {
        console.log($scope.input.choosen_language.code)
        $translate.use($scope.input.choosen_language.code);
        SharedState.turnOff("language_panel");
    }
}
