// by dribehance <dribehance.kksdapp.com>
var modifyTradePasswordController = function($rootScope, $scope, userServices, errorServices, toastServices, localStorageService, config) {
    // user input
    $scope.input = {
        username: "",
        password: "",
        verifycode: "",

    };
    // counting
    $scope.callbackTimer = {};
    $scope.callbackTimer.counting = 0;
    $scope.callbackTimer.finish = function() {
        $scope.callbackTimer.counting = 0;
        $scope.$apply();
    }
    $scope.callbackTimer.addSeconds = function(seconds) {
        angular.element("#kkcountdown")[0].clear();
        angular.element("#kkcountdown")[0].resume();
        angular.element("#kkcountdown")[0].start();
    };
    // get verifycode
    $scope.getVerifycode = function() {
        userServices.verifycode.getVerifycode({
            name: $scope.input.username
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        });
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(60);
    }
    $scope.ajaxForm = function() {
        userServices.updateTradePsd({
            username: $scope.input.username,
            password: $scope.input.password,
            verifycode: $scope.input.verifycode
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
                $rootScope.back()
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
