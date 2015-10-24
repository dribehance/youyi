// by dribehance <dribehance.kksdapp.com>
var cashController = function($rootScope, $scope, $location, $filter, walletServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        money: "",
        bank_name: "",
        bank_cardno: "",
        realname: "",
        password: "",
        paying: false
    }
    $scope.error = {
        show: false,
        message: ""
    }
    $scope.ajaxForm = function() {
        if ($scope.input.password == "" || $scope.input.paying) {
            return;
        }
        $scope.paying = true;
        toastServices.show();
        walletServices.cash($scope.input).then(function(data) {
            toastServices.hide()
            $scope.paying = false;
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                // $rootScope.back();
                $location.path("records");
            } else {
                $scope.error = {
                    show: true,
                    message: data.message
                };
                // errorServices.autoHide(data.message);
            }
        })
    }
    toastServices.show();
    walletServices.query().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.wallet = data.MyMoneyResponse;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // password control
    $scope.imulate_password = [];
    $scope.prepare_imulate_password = function() {
        $scope.imulate_password = new Array($scope.input.password.length);
    };
    $scope.$watch("input.password", function(n, o) {
        if (n === undefined) return;
        $scope.prepare_imulate_password();
        if ($scope.input.password.length == 6) {
            $scope.ajaxForm();
        }
        if ($scope.input.password.length > 6) {
            $scope.input.password = $filter("limitTo")($scope.input.password, 6)
        }
    })
}
