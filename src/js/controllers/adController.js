// by dribehance <dribehance.kksdapp.com>
var adController = function($scope, $rootScope, settingServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.ajaxForm = function() {
        toastServices.show();
        settingServices.ad({
            content: $scope.input.content
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.back()
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
