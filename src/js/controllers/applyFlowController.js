// by dribehance <dribehance.kksdapp.com>
var applyFlowController = function($rootScope, $scope, $route,$routeParams, $timeout, $filter, SharedState, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        from_date: "",
        from_time: "",
        to_date: "",
        to_time: "",
        title: "",
        category: {},
        price: 0,
        total: 0,
        address: "请选择",
        content: "",
        other: "",
        from_date_options: {
            format: "yyyy-mm-dd",
            min:new Date(),
        },
        to_date_options: {
            format: "yyyy-mm-dd",
        },
        time_options: {
            format: "HH:i",
            min:0.5,
            max:[23,30]
        }
    };
    $scope.choosen = {};
    // step 1 
    $scope.languages = [];
    $scope.choosen_language = {};
    toastServices.show();
    taskServices.queryLanguageByTranslator({
        yy_user_id:$routeParams.translator_id
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.languages = data.Result.list;
            $scope.choosen_language.from = $scope.languages[0];
            $scope.choosen_language.to = $scope.languages[0];
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // step 2
    // get category;
    taskServices.queryCategoryByTranslator({
        "yy_user_id":$routeParams.translator_id
    }).then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.categories = data.Result.type;
            // $scope.apply_translator_info = data.Result.yyInfo;
            $scope.input.price = data.Result.yyInfo.pay_day;
            $scope.input.currency_type = data.Result.yyInfo.currency_type;
            $scope.choosen.city.name = data.Result.yyInfo.address;
            $scope.choosen.city.city_dict_group_id = data.Result.yyInfo.city_dict_group_id;
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
    // $scope.$watch("choosen.city.name",function(n,o) {
    //     if (n === undefined) return;
    //     SharedState.turnOff("district_panel")
    // },true)
    $scope.next = function(step) {
        if ($scope.input.from_date == null || $scope.input.from_time == null || $scope.input.to_date == null || $scope.input.to_time == null) {
            errorServices.autoHide("请选择时间");
            return;
        }
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
            "city_dict_group_id": $scope.choosen.city.city_dict_group_id,
            "description": $scope.input.content,
            "yy_user_id": $routeParams.translator_id,
            "is_apply": "0",
        };
        toastServices.show();
        taskServices.release(input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                // $rootScope.cover.show = true;
                $scope.tips = data.message;
                $scope.task_id = data.task_id;
                SharedState.turnOn("modal2");
            } else {
                errorServices.autoHide(data.message);
            }
        })

    }
    $scope.close = function() {
        toastServices.show();
        $timeout(function() {
            // $route.reload();
            $rootScope.back();
        }, 1000)
    }
    $scope.create = function() {
        // do something create 
        toastServices.show();
        taskServices.create({
            "task_id": $scope.task_id
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
