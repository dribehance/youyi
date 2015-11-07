// by dribehance <dribehance.kksdapp.com>
var translatorsController = function($scope, $location, SharedState, translatorServices, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.choosen = {};
    $scope.translators = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多",
        filter_language_group_id: "",
        filter_place_group_id: "",
        filter_type_group_id: "",
        filter_money: "",
        kw: ""
    };
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        translatorServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.concat(data.Result.persons.list);
                $scope.no_more = $scope.translators.length == data.Result.persons.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    // filter
    $scope.filter = {
        name: "",
    };
    // filter
    $scope.offset_top = "0px";
    $scope.$watch("filter.name", function(n, o) {
        $scope.offset_top = $("#filter").offset().top - 16 + "px";
    })
    $scope.reset_filter = function() {
        $scope.filter.name = "";
    };
    /*
     * hiden content for language,location,price,category
     */
    // language
    taskServices.languages().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.languages = data.Result.languages
            $scope.languages = $scope.languages.map(function(language) {
                language.checked = false;
                return language;
            })
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.choosen.languages = [];
    $scope.choose_language = function() {
        var count = $scope.get_language_count();
        if (count < 2) {
            errorServices.autoHide("请至少选择两种语言");
            return;
        }
        // do somethig
        $scope.filter.name = "";
        $scope.choosen.languages = $scope.languages.filter(function(language) {
            return language.checked;
        });
        var language_ids = $scope.choosen.languages.map(function(language) {
            return language.group_id;
        }).join("、");
        language_ids = "{" + language_ids + "}";
        // reset
        $scope.translators = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_language_group_id: language_ids,
        });
        $scope.loadMore();
    }
    $scope.reset_language = function() {
        angular.forEach($scope.languages, function(language) {
            language.checked = false;
        });
        // do something
        $scope.filter.name = "";
        $scope.choosen.languages = [];
        // reset;
        $scope.translators = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_language_group_id: "",
        });
        $scope.loadMore();
    };
    $scope.reset_location = function() {
        $scope.filter.name = "";
        $scope.choosen.city = {
            name: ""
        };
        // reset;
        $scope.tasks = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_place_group_id: "",
        });
        $scope.loadMore();
    }
    $scope.reset_price = function() {
        $scope.filter.name = "";
        $scope.choosen.price = {
            range: ""
        };
        // reset;
        $scope.tasks = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_money: "",
        });
        $scope.loadMore();
    }
    $scope.reset_category = function() {
        $scope.filter.name = "";
        $scope.choosen.category = {
            name: ""
        };
        // reset;
        $scope.tasks = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_type_group_id: "",
        });
        $scope.loadMore();
    }
    $scope.toggle_language = function(language) {
        if (language.checked) {
            language.checked = false;
            return;
        }
        var count = $scope.get_language_count();
        if (count < 2) {
            language.checked = !language.checked;
        } else {
            errorServices.autoHide("最多选择两种语言哦");
        }

    };
    $scope.get_language_count = function() {
        var count = 0;
        angular.forEach($scope.languages, function(language) {
            count += language.checked ? 1 : 0;
        });
        return count;
    };
    // location
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.choosen.city = {
        name: ""
    };
    $scope.$watch("choosen.city.name", function(n, o) {
        if (n === undefined || o === undefined || n == "") {
            return;
        }
        $scope.filter.name = "";
        var location_id = $scope.choosen.city.group_id;
        // reset;
        $scope.translators = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_place_group_id: location_id,
        });
        $scope.loadMore();
    });
    // price
    var price_by_hour = [{
        unit: "CNY",
        range: "0-100"
    }, {
        unit: "CNY",
        range: "100-200"
    }, {
        unit: "CNY",
        range: "200-300"
    }, {
        unit: "CNY",
        range: "300-400"
    }, {
        unit: "CNY",
        range: "400-500"
    }, {
        unit: "CNY",
        range: "500以上"
    }];
    var price_by_day = [{
        unit: "CNY",
        range: "0-1000"
    }, {
        unit: "CNY",
        range: "1000-2000"
    }, {
        unit: "CNY",
        range: "2000-3000"
    }, {
        unit: "CNY",
        range: "3000-4000"
    }, {
        unit: "CNY",
        range: "4000-5000"
    }, {
        unit: "CNY",
        range: "5000以上"
    }]
    $scope.prices = price_by_hour;
    $scope.price_tab = {};
    $scope.price_tab.name = "by_hour";
    $scope.choosen.price = {
        range: ""
    };
    $scope.$watch("choosen.price.range", function(n, o) {
        if (n === undefined || o === undefined || n == "") {
            return;
        }
        $scope.filter.name = "";
        var money = $scope.choosen.price.range;
        // reset;
        $scope.translators = [];
        $scope.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            filter_money: money,
        });
        $scope.loadMore();
    })
    $scope.$watch("price_tab.name", function(n, o) {
        if (n === undefined || o === undefined) {
            return;
        }
        if (n == "by_hour") {
            $scope.prices = price_by_hour;
        } else {
            $scope.prices = price_by_day
        }
    });
    // category
    taskServices.category().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.categories = data.Result.type;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.choosen.category = {
        name: ""
    };
    $scope.$watch("choosen.category.name", function(n, o) {
            if (n === undefined || o === undefined || n == "") {
                return;
            }
            $scope.filter.name = "";
            // reset;
            $scope.translators = [];
            $scope.no_more = false;
            $scope.page = angular.extend({}, $scope.page, {
                pn: 1,
                page_size: 10,
                message: "点击加载更多",
                filter_type_group_id: $scope.choosen.category.group_id,
            });
            $scope.loadMore();
        })
        // search pannel
    $scope.input = {};
    $scope.show_search_panel = function() {
        SharedState.turnOn("search_translators_panel");
    }
    $scope.search = function() {
        if (!$scope.input.search) {
            return
        }
        $location.path("search/translators/" + $scope.input.search);
    }
}
