// by dribehance <dribehance.kksdapp.com>
var meInfoController = function($scope, $rootScope, $location, $timeout, SharedState, userServices, taskServices, errorServices, toastServices, localStorageService, config) {
    // location
    $scope.countries = [];
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;

        } else {
            errorServices.autoHide(data.message);
        }
    });
    // birthday;
    $scope.generateYear = function(year) {
        var y = [];
        for (var i = 1900; i < year; i++) {
            y.push(i)
        }
        return y;
    };
    $scope.birthday = {
        year: $scope.generateYear(2100),
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        y: $rootScope.user.age_date.split("-")[0] == "" ? 1990 : parseInt($rootScope.user.age_date.split("-")[0]),
        m: parseInt($rootScope.user.age_date.split("-")[1]) || 1,
        d: parseInt($rootScope.user.age_date.split("-")[2]) || 1
    };
    console.log($scope.birthday)
    // input;
    $scope.input = {};
    $scope.input.choosen_city = {};
    $scope.ajaxForm = function() {
        toastServices.show();
        $rootScope.user.age_date =$scope.birthday.y +"-"+$scope.birthday.m+"-"+$scope.birthday.d;
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
    $scope.modify = function(type) {
        $location.path("modify_phone_email").search("type", type)
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
