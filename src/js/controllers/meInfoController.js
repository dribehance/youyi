// by dribehance <dribehance.kksdapp.com>
var meInfoController = function($scope, $rootScope,$location, $timeout, SharedState, userServices, taskServices, errorServices, toastServices, localStorageService, config) {
    // location
    $scope.countries = [];
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;

        } else {
            errorServices.autoHide(data.message);
        }
    });
    // input;
    $scope.input = {};
    $scope.input.choosen_city = {};
    $scope.ajaxForm = function() {
        toastServices.show();
        $rootScope.user.city_dict_group_id = $scope.input.choosen_city.group_id;
        userServices.info.updateBasic($rootScope.user).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $timeout(function() {
                    $rootScope.back();
                }, 1500)
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    $scope.choosen_city = function() {
        $rootScope.user.country = $scope.countries[$scope.choosen_country_index].country;
        $rootScope.user.city = $scope.input.choosen_city.city;
        SharedState.turnOff("district_panel");
    }
    $scope.outerIndex = function(index) {
        $scope.choosen_country_index = index
    }
    $scope.sync_back = function() {
        userServices.sync();
        $rootScope.back();
    }
    $scope.modify = function (type) {
        $location.path("modify_phone_email").search("type",type)
    }
}
angular.module("Youyi").controller("avatarController", function($scope, localStorageService, config) {
    $scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
        flow.opts.target = config.url + "/app/UserCenter/updateAvatar";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "avatar";
        flow.opts.query = {
            "token": localStorageService.get("token")
        }
        flow.upload();
    })
});
angular.module("Youyi").controller("coverController", function($scope, localStorageService, config) {
    $scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
        flow.opts.target = config.url + "/app/UserCenter/updateBgImg";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "bg_image";
        flow.opts.query = {
            "token": localStorageService.get("token")
        }
        flow.upload();
    })
});
