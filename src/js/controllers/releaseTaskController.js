// by dribehance <dribehance.kksdapp.com>
var releaseTaskController = function($rootScope,$filter, $scope, $route, $timeout, $filter, SharedState, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        from_date: new Date(),
        from_time: new Date(),
        to_date: new Date(),
        to_time: new Date,
        title: "",
        category: {},
        price: 100,
        total: 0,
        address: "请选择",
        content: "",
        other: "",
    };
    $scope.choosen = {};
    // step 1 
    $scope.languages = [];
    $scope.choosen_language = {};
    toastServices.show();
    taskServices.queryLanguageByTask().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.languages = data.languageList;
            $scope.choosen_language.from = $scope.languages[0];
            $scope.choosen_language.to = $scope.languages[0];
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // step 2
    // get category;
    taskServices.category().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.categories = data.Result.type;
            $scope.input.category = $scope.categories[0]
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // get location;
    $scope.choosen.city = {
        country: "请选择",
        name: "",
    };
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.next = function(step) {
        var input = {
            "start_time": $filter("date")($scope.input.from_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.from_time, "HH:mm"),
            "end_time": $filter("date")($scope.input.to_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.to_time, "HH:mm"),
            "price_for_day": $scope.input.price,
        }
        toastServices.show();
        taskServices.queryTotalByDay(input).then(function(data) {
            toastServices.hide();
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                SharedState.set(step);
                $scope.input.total = data.total_money;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // step 3
    $scope.ajaxForm = function() {
        var input = {
            "from_language_group_id": $scope.choosen_language.from.group_id,
            "to_language_group_id": $scope.choosen_language.to.group_id,
            "start_time": $filter("date")($scope.input.from_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.from_time, "HH:mm"),
            "end_time": $filter("date")($scope.input.to_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.to_time, "HH:mm"),
            "price_for_day": $scope.input.price,
            "title": $scope.input.title,
            "task_type_group_id": $scope.input.category.group_id,
            "other_type_note": $scope.input.other,
            "total_money": $scope.input.total,
            "city_dict_group_id": $scope.choosen.city.group_id,
            "description": $scope.input.content,
            "yy_user_id":$rootScope.user.user_id,
            "is_apply":"1",
        };
        localStorageService.set("recommand", input);
        toastServices.show();
        taskServices.release(input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                // $rootScope.cover.show = true;
                // SharedState.turnOn("modal2");
                $scope.task_id = data.task_id;
                $scope.tips = data.message;
                return taskServices.queryRecommandTask(angular.extend({}, {
                    pn: 1,
                    page_size: 10
                }, input));
            } else {
                errorServices.autoHide(data.message);
            }
        }).then(function(data) {
            if (data && data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.recommands = data.Result.recommends.totalRow;
                // $rootScope.cover.show = true;
                SharedState.turnOn("modal2");
            } else {
                errorServices.autoHide(data.message);
            }
        });

    }
    $scope.close = function() {
        toastServices.show();
        $timeout(function() {
            $route.reload();
        }, 1000)
    }
}
