// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("taskServices", function($http, localStorageService, config) {
    return {
        // location filter
        location: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/cities",
                method: "GET",
                cache: true,
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // language filter
        languages: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/languages",
                method: "GET",
                cache: true,
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // category filter
        category: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/type",
                method: "GET",
                cache: true,
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // index task list
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/task",
                method: "GET",
                cache: true,
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "page_size": input.page_size,
                    "pn": input.pn,
                    "filter_language_group_id": input.filter_language_group_id,
                    "filter_place_group_id": input.filter_place_group_id,
                    "filter_type_group_id": input.filter_type_group_id,
                    "filter_money": input.filter_money,
                    "kw": input.kw,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // task detail
        queryById: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/taskDetail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // apply task
        apply: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/applyTask",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // release task :choose task
        queryLanguageByTask: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/languageList",
                method: "GET",
                cache: true,
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // calculate total price by time
        queryTotalByDay: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/countTotalMoney",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "start_time": input.start_time,
                    "end_time": input.end_time,
                    "price_for_day": input.price_for_day,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // release task
        release: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/publishTwo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "from_language_group_id": input.from_language_group_id,
                    "to_language_group_id": input.to_language_group_id,
                    "start_time": input.start_time,
                    "end_time": input.end_time,
                    "title": input.title,
                    "task_type_group_id": input.task_type_group_id,
                    "other_type_note": input.other_type_note,
                    "price_for_day": input.price_for_day,
                    "total_money": input.total_money,
                    "city_dict_group_id": input.city_dict_group_id,
                    "task_description": input.description,
                    "yy_user_id": input.yy_user_id,
                    "is_apply": input.is_apply,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // apply and the same time create task
        create:function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/IsBuild",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id":input.task_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // task released
        queryTaskByRelease: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskController/publish",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "pn": input.pn,
                    "page_size": input.page_size
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // task accept
        queryTaskByAccept: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskController/request",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // applicants 
        queryApplicantsByTask: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/requestUser",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                    "pn": input.pn,
                    "page_size": input.page_size,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryRecommandTask: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/PublishTask/recommend",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "from_language_group_id": input.from_language_group_id,
                    "to_language_group_id": input.to_language_group_id,
                    "task_type_group_id": input.task_type_group_id,
                    // "start_time": input.start_time,
                    // "end_time": input.end_time,
                    // "title": input.title,
                    // "other_type_note": input.other_type_note,
                    "price_for_day": input.price_for_day,
                    // "total_money": input.total_money,
                    "city_dict_group_id": input.city_dict_group_id,
                    // "description": input.description,
                    "pn": input.pn,
                    "page_size": input.page_size,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryPaymentInfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/comfiyUser",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "yy_user_id": input.yy_user_id,
                    "task_id": input.task_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        pay:function (input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/comfiyPay",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "user_id": input.user_id,
                    "task_id": input.task_id,
                    "pay_type": input.pay_type,
                    "pay_total_money":input.pay_total_money,
                    "pay_password": input.pay_password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // agree task 
        agree: function (input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/acceptTask",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // reject task 
        reject: function (input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/refuseTask",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
