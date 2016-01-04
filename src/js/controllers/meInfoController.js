// by dribehance <dribehance.kksdapp.com>
var meInfoController = function($scope, $rootScope, $filter, $location, $interval, $timeout, SharedState, userServices, taskServices, errorServices, toastServices, localStorageService, config) {
    var timestamp = new Date().getTime();
    var timer = $interval(function() {
        var now = new Date().getTime();
        if (now - timestamp > 3000) {
            $interval.cancel(timer);
            return;
        }
        if (angular.equals($rootScope.user, {})) return;
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
        $interval.cancel(timer);
    }, 10);

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
        // check nickname
        if ($rootScope.user.nickname == undefined || $rootScope.user.nickname == '') {
            var message = $filter("translate")("Enter Your Nickname");
            errorServices.autoHide(message);
            return;
        }
        // check realname
        if ($rootScope.user.name == undefined || $rootScope.user.name == '') {
            var message = $filter("translate")("Enter Your Real Name");
            errorServices.autoHide(message);
            return;
        }
        // check area
        if ($rootScope.user.city == undefined || $rootScope.user.city == '') {
            var message = $filter("translate")("Select Your Region");
            errorServices.autoHide(message);
            return;
        }
        // check profession
        if ($rootScope.user.profession == undefined || $rootScope.user.profession == '') {
            var message = $filter("translate")("Enter the Industry in Which You are Working");
            errorServices.autoHide(message);
            return;
        }
        // check phone or email
        if ($rootScope.user.telephone == "" && $rootScope.user.email == "") {
            errorServices.autoHide("Enter Your Mobile No. or Email")
            return;
        }
        toastServices.show();
        $rootScope.user.age_date = $scope.birthday.y + "-" + $scope.birthday.m + "-" + $scope.birthday.d;
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
