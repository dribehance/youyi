// by dribehance <dribehance.kksdapp.com>
var cashController = function($rootScope, $scope, walletServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        money: "",
        bank: "",
        bank_cardno: "",
        realname: "",
        password: ""
    }
    $scope.error = {
        show: false,
        message: ""
    }
    $scope.ajaxForm = function() {
        console.log($scope.input)
        toastServices.show();
        walletServices.cash($scope.input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.back();
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
    walletServices.query().then(function(data){
        toastServices.hide()
        if(data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.wallet = data.MyMoneyResponse;       
        }
        else {
            errorServices.autoHide(data.message);
        }
    })
}
