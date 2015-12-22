// by dribehance <dribehance.kksdapp.com>
var bankController = function($scope, $rootScope, $routeParams, walletServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        bank_name: "",
        bank_cardno: "",
        realname: "",
        telephone: ""
    }
    if ($routeParams.bank_id != "0") {
        toastServices.show();
        walletServices.queryBankById({
            bank_car_id:$routeParams.bank_id
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.input = {
                    bank_name: data.Result.bankCar.bank_name,
                    bank_cardno: data.Result.bankCar.bank_no,
                    realname: data.Result.bankCar.bank_user_name,
                    telephone: data.Result.bankCar.bank_telephone
                }
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.ajaxForm = function() {
        toastServices.show();
        var input = {
            bank_name: $scope.input.bank_name,
            bank_no: $scope.input.bank_cardno,
            bank_user_name: $scope.input.realname,
            bank_telephone: $scope.input.telephone
        };
        // console.log(input)
        // return;
        walletServices.updateBank(input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.back()
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
