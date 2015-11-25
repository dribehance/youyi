angular.module("Youyi").controller("weixinController", function($scope, $rootScope, $window, $routeParams, $location, SharedState, userServices, weixinServices, errorServices, toastServices, localStorageService, config) {
    // query access token;
    var redirect = function() {
        if ($routeParams.state == "weixin" && !$routeParams.code) {
            $location.path("index");
        }
        if ($routeParams.state == "weixin" && $routeParams.code) {
            // $rootScope.back();
            // $location.path("index");
            toastServices.show();
            weixinServices.queryAccessToken($routeParams.code).then(function(data) {
                $window.alert(data.errcode)
                if (data.errcode == "0") {
                    return data;
                } else {
                    return false;
                }
            }).then(function(data) {
                if (!data) return;
                localStorageService.set("access_token", data.access_token);
                localStorageService.set("refresh_token", data.refresh_token);
                localStorageService.set("openid", data.openid);
                // query user info
                weixinServices.queryUserinfo(data).then(function(data) {
                    if (data.errcode == "0") {
                        return data;
                    } else {
                        return false;
                    }
                });
            }).then(function(data) {
                if (!data) return;
                // save user info to server
                var query = {
                    "uid": data.openid,
                    "u_type": 1,
                    "nickname": data.nickname,
                    "icon_url": data.headimgurl,
                    "gender": data.sex == 1 ? "男" : "女"
                }
                toastServices.show();
                userServices.signinByOauth(query).then(function(data) {
                    toastServices.hide()
                    if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                        SharedState.turnOff("uiSidebarLeft");
                        localStorageService.set("token", data.token);
                        userServices.sync();
                        $location.path("index").search("code", null).replace();
                    } else {
                        errorServices.autoHide(data.message);
                    }
                })
            })
        }
    }
    redirect();
});
