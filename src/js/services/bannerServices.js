// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("bannerServices", function($http, localStorageService, config) {
    return {
        query: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/homeBanner",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "language_app":localStorageService.get("language")
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
