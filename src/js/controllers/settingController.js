// by dribehance <dribehance.kksdapp.com>
var settingController = function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.choosen_language = "";
    $scope.languages = ["中文", "日语", "韩语", "泰语", "英语"];
    $scope.exit = function() {
        $rootScope.back();
        localStorageService.remove("token");
    }
}
