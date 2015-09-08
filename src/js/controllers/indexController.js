// by dribehance <dribehance.kksdapp.com>
var indexController = function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.banners = ["../images/banner.png", "ss", "sdf"];
    $scope.filter = {
            name: "",
            country: "hot",
            salary: "by_hour"
        }
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
        if (count <2) {
            errorServices.autoHide("请选择两种语言");
            return;
        }
        // do somethig
        $scope.filter.name ="";
        $scope.choosen.languages = $scope.languages.filter(function(language){
            return language.checked;
        })
    }
    $scope.reset_language = function(){
        angular.forEach($scope.languages, function(language) {
            language.checked = false;
        });
        // do something
        $scope.filter.name ="";
        $scope.choosen.languages = [];
    };
    $scope.toggle_language = function(language) {
        if (language.checked) {
            language.checked = false;
            return;
        }
        var count = $scope.get_language_count();
        if ( count < 2) {
            language.checked = !language.checked;
        } else {
            errorServices.autoHide("最多选择两种语言哦");
        }

    };
    $scope.get_language_count = function () {
        var count = 0;
        angular.forEach($scope.languages, function(language) {
            count += language.checked ? 1 : 0;
        });
        return count;
    }
    // location
    var countrys = [{
        name: "中国",
        city: ["深圳", "上海", "北京"]
    }, {
        name: "日本",
        city: ["东京", "横滨", "大阪"]
    }, {
        name: "韩国",
        city: ["韩城", "上海", "北京"]
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
    })

}
