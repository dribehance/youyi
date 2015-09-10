// by dribehance <dribehance.kksdapp.com>
var meController = function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.user = {
        cover: "../images/translator.png",
        languages: [{
            name: "中文",
            level: "母语"
        }, {
            name: "日语",
            level: "流利"
        }, {
            name: "韩语",
            level: "流利"
        }, {
            name: "英语",
            level: "流利"
        }]
    };
    $scope.removeLanguage = function(language) {
            $scope.user.languages = $scope.user.languages.filter(function(lang) {
                return (lang.name != language.name || lang.level != language.level);
            })
        }
        // language picker
    $scope.choosen_language = {
        name: "",
        level: ""
    }
    $scope.languages = {
        name: ["中文", "日语", "韩语", "泰语", "英语"],
        level: ["母语", "专业", "流利"]
    }
    $scope.pickLanguage = function() {
        if ($scope.choosen_language.name == "" || $scope.choosen_language.level == "") {
            return;
        }
        $scope.user.languages.push($scope.choosen_language)
        $scope.choosen_language = {
            name: "",
            level: ""
        }

    }
}
