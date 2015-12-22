// by dribehance <dribehance.kksdapp.com>
var translatorsController = function($scope, $location, SharedState, translatorServices, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.choosen = {};
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
            var group_ids = $scope.choosen.languages.map(function(lng) {
                return lng.group_id;
            }).join("、")
            $scope.languages = $scope.languages.map(function(language) {
                if (group_ids.indexOf(language.group_id) != -1) {
                    language.checked = true;
                } else {
                    language.checked = false;
                }
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
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_language_group_id: language_ids,
        });
        localStorageService.set("choosen_ue", $scope.choosen)
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
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_language_group_id: "",
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    };
    $scope.reset_location = function() {
        $scope.filter.name = "";
        $scope.choosen.city = {
            name: ""
        };
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_place_group_id: "",
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    }
    $scope.reset_price = function() {
        $scope.filter.name = "";
        $scope.choosen.price = {
            range: ""
        };
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_money: "",
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    }
    $scope.reset_category = function() {
        $scope.filter.name = "";
        $scope.choosen.category = {
            name: ""
        };
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_type_group_id: "",
        });
        localStorageService.set("choosen_ue", $scope.choosen)
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
    $scope.choosen.city = (localStorageService.get("choosen_ue") && localStorageService.get("choosen_ue").city) || {
        name: ""
    };
    $scope.$watch("choosen.city.name", function(n, o) {
        if (n === o || n == "") {
            return;
        }
        $scope.filter.name = "";
        var location_id = $scope.choosen.city.group_id;
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_place_group_id: location_id,
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    });
    // price
    // var price_by_day = [{
    //     unit: "CNY",
    //     range: "0-500"
    // }, {
    //     unit: "CNY",
    //     range: "500-1000"
    // }, {
    //     unit: "CNY",
    //     range: "1000-1500"
    // }, {
    //     unit: "CNY",
    //     range: "1500-2000"
    // }, {
    //     unit: "CNY",
    //     range: "2000-2500"
    // }, {
    //     unit: "CNY",
    //     range: "2500以上"
    // }];
    var parsePrice = function(price) {
        var obj = {};
        if (!price) return;
        obj["unit"] = price.split(" ")[0];
        obj["range"] = price.split(" ")[1].split("/")[0];
        obj["per"] = price.split(" ")[1].split("/")[1];
        return obj;
    }
    // query price by location
    toastServices.show();
    taskServices.price().then(function(data){
        toastServices.hide()
        if(data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            var prices = data.Result.prices;
            var price_by_day = [];
            price_by_day.push(parsePrice(prices.price_500));
            price_by_day.push(parsePrice(prices.price_1000));
            price_by_day.push(parsePrice(prices.price_1500));
            price_by_day.push(parsePrice(prices.price_2000));
            price_by_day.push(parsePrice(prices.price_2500));
            price_by_day.push(parsePrice(prices.price_2600));
            $scope.prices = price_by_day;
        }
        else {
            errorServices.autoHide(data.message);
        }
    })
    // $scope.prices = price_by_hour;
    // $scope.prices = price_by_day;
    // $scope.price_tab = {};
    // $scope.price_tab.name = "by_hour";
    $scope.choosen.price = (localStorageService.get("choosen_ue") && localStorageService.get("choosen_ue").price) || {
        range: ""
    };
    $scope.$watch("choosen.price.range", function(n, o) {
        if (n === o || n == "") {
            return;
        }
        $scope.filter.name = "";
        var money = $scope.choosen.price.range;
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_money: money,
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    });
    // category
    taskServices.category().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.categories = data.Result.type;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.choosen.category = (localStorageService.get("choosen_ue") && localStorageService.get("choosen_ue").category) || {
        name: ""
    };
    $scope.$watch("choosen.category.name", function(n, o) {
        if (n === o || n == "") {
            return;
        }
        $scope.filter.name = "";
        // reset;
        $scope.translators = [];
        $scope.page.no_more = false;
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
            filter_type_group_id: $scope.choosen.category.group_id,
        });
        localStorageService.set("choosen_ue", $scope.choosen)
        $scope.loadMore();
    });
    /*
     * hiden content for language,location,price,category
     */
    // translators
    $scope.translators = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "Load More",
        filter_language_group_id: $scope.choosen.languages.map(function(language) {
            return language.group_id;
        }).join("、"),
        filter_place_group_id: $scope.choosen.city.group_id,
        filter_type_group_id: $scope.choosen.category.group_id,
        filter_money: $scope.choosen.price.range,
        kw: ""
    };
    $scope.loadMore = function() {
        if ($scope.page.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "Loading";
        translatorServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.concat(data.Result.persons.list);
                $scope.page.no_more = $scope.translators.length == data.Result.persons.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.page.no_more) {
                $scope.page.message = "No More";
            }
            $scope.page.pn++;
        })

    }
    if (localStorageService.get("cache") && localStorageService.get("cache").translators) {
        $scope.translators = localStorageService.get("cache").translators.content;
        $scope.page = localStorageService.get("cache").translators.page;
        angular.element("#scrollable-content").animate({
            scrollTop: localStorageService.get("cache").translators.scroll_hood
        })
        localStorageService.set("cache",{translators:null})
    } else {
        $scope.loadMore();
    }
    $scope.routeTo = function(id) {
        var cache_data = {
            content: $scope.translators,
            page: $scope.page,
            scroll_hood: angular.element("#scrollable-content").scrollTop()
        }
        localStorageService.set("cache", {
            translators:cache_data
        });
        $location.path("translators/" + id);
    };
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
