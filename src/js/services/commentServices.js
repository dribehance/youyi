// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("commentServices", function($http, localStorageService, config) {
    return {
        queryTags: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/tag",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id":input.task_id
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
