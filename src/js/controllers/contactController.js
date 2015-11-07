// by dribehance <dribehance.kksdapp.com>
var contactController = function($scope, $rootScope, settingServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        issue: "0"
    }
    $scope.ajaxForm = function() {
        toastServices.show();
        settingServices.contact({
            content: $scope.input.content,
            type: $scope.input.issue
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
