// by dribehance <dribehance.kksdapp.com>
var releaseTaskController = function($rootScope, $filter, $scope, $route, $timeout, $location, $filter, SharedState, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        from_date: "",
        from_time: "",
        to_date: "",
        to_time: "",
        title: "",
        category: {},
        price: "",
        currency: "",
        total: 0,
        address: "Please choose",
        content: "",
        other: "",
        from_date_options: {
            format: "yyyy-mm-dd",
            min: new Date(),
        },
        to_date_options: {
            format: "yyyy-mm-dd",
        },
        time_options: {
            format: "HH:i",
            min: [0, 0],
            max: [23, 30]
        },
        to_time_options: {
            format: "HH:i",
            min: [0, 0],
            max: [23, 30]
        }
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
    $scope.queryMinPrice = function(callback) {
        // query min price
        var input = {
            "from_language_group_id": $scope.choosen_language.from.group_id,
            "to_language_group_id": $scope.choosen_language.to.group_id,
            "task_type_group_id": $scope.input.category.group_id,
            "price_for_day": $scope.input.price,
            "currency": $scope.input.currency
        };
        toastServices.show();
        taskServices.queryMinPrice(input).then(function(data) {
            toastServices.hide();
            if (data.code == config.request.SUCCESS && data.price_status == "1") {
                // $scope.min_price = data
                $scope.input.currency = data.currency_type;
                $scope.input.price = $scope.input.price < parseFloat(data.min_price_pay) ? parseFloat(data.min_price_pay) : $scope.input.price;
                if (SharedState.get("step") != 2) {
                    SharedState.set({
                        "step": 2
                    })
                }
                (callback || angular.noop)();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // $scope.$watch("input.currency",function(n,o){
    //     if (n && o) {
    //         $scope.queryMinPrice();
    //     }
    // },true)
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
        country: "",
        name: "",
    };
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.$watch("choosen.city.name", function(n, o) {
        if (n === undefined) return;
        SharedState.turnOff("district_panel")
    }, true)
    $scope.next = function(step) {
        if ($scope.input.from_date == null || $scope.input.from_time == null || $scope.input.to_date == null || $scope.input.to_time == null) {
            errorServices.autoHide("请选择时间");
            return;
        }
        var input = {
            "start_time": $filter("date")($scope.input.from_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.from_time, "HH:mm"),
            "end_time": $filter("date")($scope.input.to_date, "yyyy-MM-dd") + " " + $filter("date")($scope.input.to_time, "HH:mm"),
            "price_for_day": $scope.input.price,
            "currency_type":$scope.input.currency
        }
        $scope.queryMinPrice(function() {
            toastServices.show();
            taskServices.queryTotalByDay(input).then(function(data) {
                toastServices.hide();
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    SharedState.set(step);
                    $scope.input.total = data.total_money;
                    $scope.input.total_money_symbol = data.total_money_symbol;
                    $scope.input.total_money_message = data.total_money_message;
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        });
    };
    // $scope.$watch()
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
            "yy_user_id": $rootScope.user.user_id,
            "is_apply": "1",
            "currency": $scope.input.currency
        };
        localStorageService.set("recommand", input);
        toastServices.show();
        taskServices.release(input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.task_id = data.task_id;
                $scope.tips = data.message;
                $scope.has_recommend = data.has_recommend;
                SharedState.turnOn("modal2");
            } else {
                errorServices.autoHide(data.message);
            }
        });

    }
    $scope.close = function() {
        toastServices.show();
        $timeout(function() {
            $location.path("tasks")
                // $route.reload();
        }, 1000)
    };
}
