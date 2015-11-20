// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("weixinServices", function($http, $window, config) {
    return {
        queryAuthorizationCode: function() {
            var url = config.weixin.base + "?" + "appid=" + config.weixin.appid + "&redirect_uri=" + encodeURIComponent(config.weixin.redirect_uri) + "&response_type=" + config.weixin.response_type + "&scope=" + config.weixin.scope + "&state=" + config.weixin.reject + config.weixin.wechat_redirect;
            $window.location.href = url;
        },
        queryAccessToken: function(code) {
            // var url = config.weixin.access_token_url + "?" + "appid=" + config.weixin.appid + "&secret=" + config.weixin.secret + "&code=" + code + "&grant_type=" + "authorization_code";
            // $window.location.href = url;
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.weixin.access_token_url,
                method: "GET",
                params: angular.extend({}, {
                    "appid": config.weixin.appid,
                    "secret": config.weixin.secret,
                    "code": code,
                    "grant_type": "authorization_code"
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryUserinfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.weixin.userinfo_url,
                method: "GET",
                params: angular.extend({}, {
                    "access_token": input.access_token,
                    "openid": input.openid,
                    "lang": "zh_CN"
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
