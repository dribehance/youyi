// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("facebookServices", function($rootScope, $route, $http, $window, $location, $q, SharedState, userServices, toastServices, errorServices, localStorageService, config) {
    $window.fbAsyncInit = function() {
        FB.init({
            appId: '1692835377595486',
            xfbml: true,
            version: 'v2.5'
        });
    };
    return {
        share: function(link) {
            FB.ui({
                method: "feed",
                link: link || config.share.link,
                caption: "by dribehance",
            }, function(response) {
                $route.reload();
                // SharedState.turnOff("uiSidebarLeft")
            });
        },
        login: function() {
            var self = this;
            FB.login(function(response) {
                self._statusChangeCallback(response);
            }, {
                scope: 'public_profile,email'
            });
        },
        logout: function() {
            FB.logout(function(response) {
                console.log(response);
            })
        },
        _statusChangeCallback: function(response) {
            var self = this;
            if (response.status == "connected") {
                self._getUserinfo(response.authResponse.userID).then(function(data) {
                    self._save(data);
                });
            }
            // $rootScope.$emit("facebook_" + response.status, response);
        },
        _getUserinfo: function(user_id) {
            var deferred = $q.defer();
            FB.api("/" + user_id, {
                // fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },
        _save: function(data) {
            // save user info to server
            var query = {
                "uid": data.id,
                "u_type": 2,
                "nickname": data.name,
                "icon_url": data.cover,
                "gender": data.gender == "male" ? "男" : "女"
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
        }
    }
});
