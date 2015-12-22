// by dribehance <dribehance.kksdapp.com>
var cashController = function($rootScope, $routeParams, $scope, $location, $filter, walletServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        money: "",
        bank_name: "",
        bank_cardno: "",
        realname: "",
        password: "",
        paying: false
    }
    // query bank info
    if ($routeParams.bank_id != "0") {
        toastServices.show();
        walletServices.queryBankById({
            bank_car_id: $routeParams.bank_id
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.input = angular.extend({}, $scope.input, {
                    bank_name: data.Result.bankCar.bank_name,
                    bank_cardno: data.Result.bankCar.bank_no,
                    realname: data.Result.bankCar.bank_user_name,
                    telephone: data.Result.bankCar.bank_telephone
                })
            } else {
                errorServices.autoHide(data.message);
            }
        })
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
                errorServices.autoHide(data.message);
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
