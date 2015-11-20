// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("userServices", function($rootScope, $http, localStorageService, config) {
    return {
        signin: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/LoginResponse",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "name": input.username,
                    "password": input.password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        signinByOauth: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/thirdLogin",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "uid":input.uid,
                    "u_type":input.u_type,
                    "nickname":input.nickname,
                    "icon_url":input.icon_url,
                    "gender": input.gender
                })
            }).then(function(data) {
                return data.data;
            });
        },
        signupByTel: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/RegistTel",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "telephone": input.telephone,
                    "password": input.password,
                    "msg_code": input.sms_code,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        signupByEmail: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/RegistEmail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "email": input.email,
                    "password": input.password,
                    "email_code": input.email_code,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        forget: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/setPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.verifycode,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        updateSigninPsd: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/ResetPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.verifycode,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        updateTradePsd: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/setPayPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "language_app": localStorageService.get("language"),
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.verifycode,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        modifyPhoneOrEmail: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/updateName",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "name": input.username,
                    "old_password": input.password,
                    "msg_code": input.verifycode,
                    "type": input.type
                })
            }).then(function(data) {
                return data.data;
            });
        },
        sync: function() {
            $rootScope.user = $rootScope.user || {};
            var self = this;
            self.info.basic({}).then(function(data) {
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    $rootScope.user = angular.extend({}, $rootScope.user, data.Result.user);
                } else {
                    self.exit();
                }
            });
            self.info.sidebar({}).then(function(data) {
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    $rootScope.user = angular.extend({}, $rootScope.user, data.Result.user);
                } else {
                    self.exit();
                }
            })
        },
        exit: function() {
            $rootScope.user = {};
            localStorageService.remove("token");
        },
        verifycode: {
            getVerifycode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/GetForgetCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "name": input.name,
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            getSmscode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/getRegistTelCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "telephone": input.telephone,
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            getEmailcode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/GetRegistEmailCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "email": input.email,
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        },
        info: {
            basic: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/info",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            sidebar: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/UserBInfo",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            update: function(obj) {
                for (key in obj) {
                    var state = key;
                }
                switch (state) {
                    case "introduction":
                        return this.updateIntro(obj);
                        break;
                    case "pay_day":
                        return this.updateSalary(obj);
                        break;
                    default:
                        ;

                }
            },
            updateIntro: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/uploadIntroduction",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "introduction": input.introduction
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            updateSalary: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/uploadPayDay",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "pay_day": input.pay_day
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            updateWorkday: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/setWorkday",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "work_day": input.work_day,
                        "work_day_setting": input.work_day_setting
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            updateBasic: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/updateBInfo",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token"),
                        "language_app": localStorageService.get("language"),
                        "nickname": input.nickname,
                        "name": input.name,
                        "sex": input.gender == '1' ? "男" : "女",
                        "is_men": input.gender,
                        "city_dict_group_id": input.city_dict_group_id,
                        "profession": input.profession,
                        "age_status": input.age_status,
                        "age_date": input.age_date
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        },
        languages: {
            query: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/languageCombination",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            remove: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/deleteLanguage",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "user_language_id": input.user_language_id
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            create: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/addLanguage",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "from_language_group_id": input.from_language_group_id,
                        "to_language_group_id": input.to_language_group_id,
                        "group_id": input.group_id
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
        },
        translate_types: {
            query: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/translateType",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            remove: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/deleteTranslateType",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "first_catalog": input.first_catalg_str
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            create: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/addTranslateType",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "group_ids": input.group_ids
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
        },
        translate_experiences: {
            create: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/addExperience",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "experience": input.experience
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            remove: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/deleteExperience",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": localStorageService.get("language"),
                        "token": localStorageService.get("token"),
                        "translate_experience_id": input.translate_experience_id
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
        },
        authen: {
            query: function(type) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/userIdentity",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token"),
                        "type": type
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        }
    }
});
