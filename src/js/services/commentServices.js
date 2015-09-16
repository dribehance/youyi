// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("commentServices", function($http, config) {
    return {
        queryTags: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/tag",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
