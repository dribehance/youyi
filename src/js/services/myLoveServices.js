// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("myLoveServices", function($http, localStorageService, config) {
    return {
        like: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/addCollection",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "collection_user_id":input.collection_user_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        cancel: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/cancelCollection",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "collection_id":input.collection_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/myCollection",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language")
                })
            }).then(function(data) {
                return data.data;
            });
        },
    }
});
