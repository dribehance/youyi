// by dribehance <dribehance.kksdapp.com>
var meController = function($scope, $rootScope, $location, $timeout, SharedState, userServices, errorServices, toastServices, localStorageService, config) {
    toastServices.show();
    // basic info
    userServices.info.basic({}).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $rootScope.user = angular.extend({}, $rootScope.user, data.Result.user, {
                languages: data.Result.user_languages_list,
                translate_types: data.Result.translate_type_list,
                translate_experiences: data.Result.experiences
            });
            $scope.input.currency = $rootScope.user.currency_type;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // language
    userServices.languages.query({}).then(function(data) {
        $scope.languages = data.Result.languages;
        $scope.languages_level = data.Result.level;
    });
    // translate type
    userServices.translate_types.query({}).then(function(data) {
        $scope.translate_types = data.Result.translte_type;
    });
    $scope.input = {};
    $scope.removeLanguage = function(language) {
        toastServices.show();
        userServices.languages.remove({
            "user_language_id": language.user_language_id
        }).then(function(data) {
            toastServices.hide();
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.user.languages = $rootScope.user.languages.filter(function(lang) {
                    return (lang != language);
                });
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // language picker
    $scope.input.choosen_language = {};
    $scope.input.choosen_language_level = {}
    $scope.pickLanguage = function() {
        if (angular.equals({}, $scope.input.choosen_language) || angular.equals({}, $scope.input.choosen_language_level)) {
            return;
        }
        toastServices.show();
        userServices.languages.create({
            "from_language_group_id": $scope.input.choosen_language.from_language_group_id,
            "to_language_group_id": $scope.input.choosen_language.to_language_group_id,
            "group_id": $scope.input.choosen_language_level.group_id
        }).then(function(data) {
            toastServices.hide();
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.user.languages.push(angular.extend({}, $scope.input.choosen_language, $scope.input.choosen_language_level, {
                    "user_language_id": data.user_language_id
                }))
                $scope.choosen_language = {};
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })

    };
    // translate type picker
    $scope.input.choosen_translate_type = {};
    $scope.input.choosen_translate_skill = [];
    $scope.input.choosen_translate_groupids = "";
    $scope.input.choosen_translate_group_name = "";
    $scope.toggleSkill = function(skill) {
        return skill.selected = !skill.selected;
    }
    $scope.pickTranslateType = function() {
        $scope.input.choosen_translate_skill = $scope.translate_types[$scope.input.choosen_translate_type.index].second_catalogs.filter(function(skill) {
            return skill.selected;
        })
        if (angular.equals({}, $scope.input.choosen_translate_type) || $scope.input.choosen_translate_skill.length == 0) {
            return;
        }
        $scope.input.choosen_translate_groupids = $scope.input.choosen_translate_skill.map(function(skill) {
            return skill.group_id
        }).join("、");
        $scope.input.choosen_translate_groupids = "{" + $scope.input.choosen_translate_groupids + "}";
        $scope.input.choosen_translate_group_name = $scope.input.choosen_translate_skill.map(function(skill) {
            return skill.second_catalog;
        }).join("、")
        toastServices.show();
        userServices.translate_types.create({
                group_ids: $scope.input.choosen_translate_groupids
            }).then(function(data) {
                toastServices.hide()
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    $rootScope.user.translate_types.push({
                        "first_catalg_str": $scope.input.choosen_translate_type.name,
                        "second_catalog_str": $scope.input.choosen_translate_group_name
                    })
                } else {
                    errorServices.autoHide(data.message);
                }
            })
            // $scope.user.translate_types.push($scope.input.choosen_translate_type)
    }
    $scope.removeTranslateType = function(translate_type) {
        toastServices.show();
        userServices.translate_types.remove(translate_type).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {} else {
                errorServices.autoHide(data.message);
            }
        })
        $scope.user.translate_types = $scope.user.translate_types.filter(function(type) {
            return translate_type != type;
        })
    };
    // work day
    $scope.toggleWorkday = function(workday) {
        userServices.info.updateWorkday({
            "work_day": workday,
            "work_day_setting": $rootScope.user[workday] == "1" ? "0" : "1",
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.user[workday] = $rootScope.user[workday] == "1" ? "0" : "1";
            } else {
                errorServices.autoHide(data.message);
            }
        })
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
        if ($scope.input.editable_key == 'pay_day') {
            var temp = {
                "currency": $scope.input.currency,
                "price": $scope.input.editable_content
            }
            editable[$scope.input.editable_key] = temp;
        } else {
            editable[$scope.input.editable_key] = $scope.input.editable_content;
        }
        toastServices.show();
        userServices.info.update(editable).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                if ($scope.input.editable_key == 'pay_day') {
                    $rootScope.user["currency_type"] = $scope.input.currency;
                    $rootScope.user["pay_day"] = $scope.input.editable_content;
                } else {
                    editable[$scope.input.editable_key] = $scope.input.editable_content;
                }
                SharedState.turnOff("editable_panel");
            } else {
                errorServices.autoHide(data.message)
            }
        })
    };
    // translate_experiences
    $scope.input.experience = "";
    $scope.experienceForm = function() {
        toastServices.show();
        userServices.translate_experiences.create({
            "experience": $scope.input.experience
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.user.translate_experiences.push(data.Result);
                SharedState.turnOff("create_panel");
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.removeTranslateExperience = function(experience) {
        toastServices.show();
        userServices.translate_experiences.remove(experience).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $rootScope.user.translate_experiences = $rootScope.user.translate_experiences.filter(function(ex) {
                    return ex != experience
                });
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    $scope.sync_back = function() {
        userServices.sync();
        $rootScope.back();
    };
    // become translate intro
    console.log($rootScope.user.is_translate)
    if ($rootScope.user.is_translate != undefined && $rootScope.user.is_translate != '1') {
        $timeout(function() {
            SharedState.turnOn("is_translator_panel");
        }, 3000)
    }
    $scope.completeProfile = function() {
        if ($rootScope.user.is_translate == '-2') {
            $location.path("me_info");
        } else {
            SharedState.turnOff("is_translator_panel");
        }
    }
}
