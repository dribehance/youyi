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
    $scope.jumpByCondition = function(condition) {
        if (condition == "0") {
            $location.path("modify_trade_password")
        } else {
            $location.path("cash")
        }
    }
}
