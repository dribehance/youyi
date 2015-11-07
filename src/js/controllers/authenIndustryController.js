// by dribehance <dribehance.kksdapp.com>
var authenIndustryController = function($scope, userServices, SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        title: "",
        status: {
            "0": "待审核",
            "1": "审核通过",
            "2": "认证失败，重新认证"
        }
    };
    toastServices.show();
    userServices.authen.query("3").then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.authen_entries = data.Result;
            $scope.authen_entries = $scope.authen_entries.map(function(authen) {
                authen.status_message = $scope.input.status[authen.status]
                return authen;
            })
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.reupload = function(authen) {
        if (authen.status == 2) {
            $scope.input.replace_user_identity_id = authen.user_identity_id;
            SharedState.turnOn("upload_panel");
        }
    }
}
angular.module("Youyi").controller("authenIndustryUploadController", function($scope, $rootScope, $timeout,$route, toastServices, localStorageService, errorServices, config) {
    $scope.$on("flow::fileSuccess", function() {
        $timeout(function() {
            $scope.input.replace_user_identity_id = undefined;
            // $rootScope.back();
            $route.reload();
        }, 2000);
    })
    $scope.ajaxForm = function(flow) {
        // upload
        flow.opts.target = config.url + "/app/Person/cancelOrder";
        // flow.opts.testChunks = false;
        flow.opts.fileParameterName = "cover";
        flow.opts.testChunks = false;
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "language_app": localStorageService.get("language"),
            "invoke": "h5",
            // "replace_user_identity_id": $scope.input.replace_user_identity_id,
            "title": $scope.input.title,
            "type": "3"

        };
        if ($scope.input.replace_user_identity_id) {
            flow.opts.query.replace_user_identity_id = $scope.input.replace_user_identity_id;
        }
        flow.upload();
    };
})
