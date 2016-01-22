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
                    "task_id": input.task_id,
                    "user_id": input.user_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        release: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/TaskUser/comment",
                method: "POST",
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function(obj) {
                    var fd = new FormData();
                    angular.forEach(obj, function(value, key) {
                        fd.append(key, value);
                    });
                    return fd;
                    // var str = [];
                    // for (var p in obj)
                    //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    // return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "task_id": input.task_id,
                    "group_id": input.level.group_id,
                    "note": input.note,
                    "service": parseFloat(input.star.service) + 1,
                    "profession": parseFloat(input.star.profession) + 1,
                    "tongue": parseFloat(input.star.language) + 1,
                    "task_user_id": input.task_user_id,
                    "tag_group_id_list": input.tags,
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
