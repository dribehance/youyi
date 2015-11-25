// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("oauthServices", function($http, config) {
    return {
        initWeixin: function(url) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/shareWeixinH5",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    current_url: url
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
