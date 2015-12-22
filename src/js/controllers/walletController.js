// by dribehance <dribehance.kksdapp.com>
var walletController = function($scope, $location, walletServices, errorServices, toastServices, localStorageService, config) {
    toastServices.show();
    walletServices.query().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.wallet = data.MyMoneyResponse;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.jumpByCondition = function() {
        if ($scope.wallet.is_setPayPwd == "0") {
            $location.path("modify_trade_password");
            return;
        }
        if ($scope.wallet.is_bank == "0") {
            $location.path("bank").search("bank_id",$scope.wallet.bank_car_id);
            return;
        }
        $location.path("cash").search("bank_id",$scope.wallet.bank_car_id);
    }
}
