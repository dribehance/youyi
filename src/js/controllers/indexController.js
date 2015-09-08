// by dribehance <dribehance.kksdapp.com>
var indexController = function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.banners = ["../images/banner.png", "ss", "sdf"];
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
     * hiden content for langage,location,price,category
     */
    $scope.choosen = {};
    // language
    $scope.languages = [{
        name: "汉语",
        checked: false
    }, {
        name: "中文",
        checked: false
    }, {
        name: "韩语",
        checked: false
    }, {
        name: "英文",
        checked: false
    }];
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
        })
    }
    $scope.reset_language = function() {
        angular.forEach($scope.languages, function(language) {
            language.checked = false;
        });
        // do something
        $scope.filter.name = "";
        $scope.choosen.languages = [];
    };
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
    $scope.countrys = [{
        name: "中国",
        city: ["深圳", "上海", "北京", "南京", "广州", "武汉", "吉林", "长春", "哈尔滨"]
    }, {
        name: "日本",
        city: ["东京", "横滨", "大阪"]
    }, {
        name: "韩国",
        city: ["韩城", "朝鲜", "汉城"]
    }];
    $scope.choosen.city = {
        name: "",
        country: ""
    }
    $scope.$watch("choosen.city", function(n, o) {
        if (n === undefined || o === undefined) {
            return;
        }
        $scope.filter.name = ""
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
    $scope.choosen.price = {};
    $scope.choosen.price = {
        unit: "",
        range: ""
    }
    $scope.$watch("choosen.price.range", function(n, o) {
        if (n === undefined || o === undefined) {
            return;
        }
        $scope.filter.name = "";
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
    $scope.categories = ["商务","旅行","其他"];
    $scope.choosen.category = "";
    $scope.$watch("choosen.category",function(n,o){
        if (n === undefined || o === undefined) {
            return;
        }
        console.log(n)
        $scope.filter.name ="";
    })
}
