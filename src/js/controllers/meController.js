// by dribehance <dribehance.kksdapp.com>
var meController = function($scope,SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
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
        }],
        translate_types: [{
            index: "",
            name: "旅行",
            skills: [{
                name: "美食",
                selected: false
            }, {
                name: "旅行",
                skills: [{
                    name: "美食",
                    selected: false
                }]
            }]
        }],
        translate_experiences:["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et numquam quod nam blanditiis, atque laudantium dicta dolorem fuga asperiores consequuntur dolor, recusandae cumque, reprehenderit quo facilis fugiat hic maiores!"],
        intro:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus repudiandae quae obcaecati quos hic, libero non nobis consequatur, perferendis quo reprehenderit et voluptatibus labore, sapiente dolor quibusdam quam voluptate veritatis?"        
    };
    $scope.removeLanguage = function(language) {
        $scope.user.languages = $scope.user.languages.filter(function(lang) {
            return (lang.name != language.name || lang.level != language.level);
        })
    };
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

    };
    // translate type picker
    $scope.input.choosen_translate_type = {
        index: "",
        name: "",
        skills: [{
            name: "",
            selected: false
        }]
    }
    $scope.translate_types = [{
        name: "旅行",
        skills: [{
            name: "美食",
            selected: false
        }, {
            name: "饮食",
            selected: false
        }, {
            name: "服装",
            selected: false
        }, {
            name: "纺织",
            selected: false
        }]
    }, {
        name: "商务",
        skills: [{
            name: "流利",
            selected: false
        }]
    }];
    $scope.toggleSkill = function(skill) {
        return skill.selected = !skill.selected;
    }
    $scope.pickTranslateType = function() {
        $scope.input.choosen_translate_type.skills = $scope.translate_types[$scope.input.choosen_translate_type.index].skills.filter(function(skill) {
            return skill.selected;
        })
        $scope.user.translate_types.push($scope.input.choosen_translate_type)
    }
    $scope.removeTranslateType = function(translate_type) {
        $scope.user.translate_types = $scope.user.translate_types.filter(function(type) {
            return type.name != translate_type.name;
        })
    }
    $scope.skillsToString = function(skills) {
        var skillString = "";
        angular.forEach(skills, function(skill, index) {
            skillString += skill.name + ",";
        })
        return skillString.slice(0, skillString.length - 1);
    };
    // edit content
    $scope.input.editable_key = "";
    $scope.input.editable_content = "";
    $scope.edit = function(m) {
        for (key in m) {
            $scope.input.editable_key = key;
            $scope.input.editable_content = m[key];
        }
        SharedState.turnOn("editable_panel");
    }
    $scope.ajaxForm = function() {
        var editable = {};
        editable[$scope.input.editable_key] = $scope.input.editable_content;
        trainerServices.update(editable).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide("修改成功");
                $scope.trainer[$scope.input.editable_key] = $scope.input.editable_content;
                SharedState.turnOff("editable_panel");
            } else {
                errorServices.autoHide("服务器错误")
            }
        })
    };
    // translate_experiences
    $scope.removeTranslateExperience = function(index) {
        $scope.user.translate_experiences = $scope.user.translate_experiences.filter(function(experience,i){
            return index != i;
        })
    }
}
