// by dribehance <dribehance.kksdapp.com>
var modifyPhoneOrEmailController = function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        type: $routeParams.type,
        username:"",
        verifycode:"",
        password:"",
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
    $scope.getVerifycode = function() {
        if ($scope.input.type == '0') {
            // get telphone verifycode;
            $scope.getSmscode();
        } else {
            // get email vericode;
            $scope.getEmailcode();
        }
    }
    $scope.getSmscode = function() {
        $scope.input.telephone = $scope.input.username;
        console.log($scope.input)
        userServices.verifycode.getSmscode($scope.input).then(function(data) {
            if (data.status == config.response.SUCCESS) {
                $scope.callbackTimer.counting = 1;
                $scope.callbackTimer.addSeconds(60);
                // $scope.sidebar.error.show = false;
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.getEmailcode = function() {
        $scope.input.email = $scope.input.username;
        userServices.verifycode.getEmailcode($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
                $scope.callbackTimer.counting = 1;
                $scope.callbackTimer.addSeconds(60);
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.modifyPhoneOrEmail = function() {
        console.log($scope.input.password)
        toastServices.show();
        userServices.modifyPhoneOrEmail({
            "password": $scope.input.password,
            "username": $scope.input.username,
            "verifycode": $scope.input.verifycode,
            "type": $scope.input.type,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
