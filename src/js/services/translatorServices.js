// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("translatorServices", function($http, localStorageService, config) {
    return {
        // translator list
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/YouyiPerson/persons",
                method: "GET",
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
        // translator detail
        queryById: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/YouyiPerson/yyPersonInfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "youyi_user_id": input.youyi_user_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // recommand translators
        recommand: function(input) {
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
                    "price_for_day": input.price_for_day,
                    "city_dict_group_id": input.city_dict_group_id,
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
