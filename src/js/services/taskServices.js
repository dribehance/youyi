// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("taskServices", function($http, localStorageService, config) {
    return {
        location: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/cities",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": "CN"
                })
            }).then(function(data) {
                return data.data;
            });
        },
        language: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/languages",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": "CN"
                })
            }).then(function(data) {
                return data.data;
            });
        },
        category: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/type",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": "CN"
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
