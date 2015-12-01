// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("facebookServices", function($rootScope, $route, $http, $window, $location, $q, SharedState, userServices, toastServices, errorServices, localStorageService, config) {
    $window.fbAsyncInit = function() {
        var FB = $window.FB || undefined;
        if (!FB) return;
        FB.init({
            appId: '1692835377595486',
            xfbml: true,
            version: 'v2.5'
        });
    };
    return {
        share: function(link) {
            var FB = $window.FB || undefined;
            if (!FB) return;
            FB.ui({
                method: "feed",
                link: link || config.share.link,
                redirect_uri: link || config.share.link,
                caption: config.share.title
            }, function(response) {
                $route.reload();
                // SharedState.turnOff("uiSidebarLeft")
            });
        },
        login: function() {
            var self = this;
            var FB = $window.FB || undefined;
            if (!FB) return;
            toastServices.show();
            FB.login(function(response) {
                toastServices.hide();
                self._statusChangeCallback(response);
            }, {
                scope: 'public_profile,email'
            });
        },
        logout: function() {
            var FB = $window.FB || undefined;
            if (!FB) return;
            FB.logout(function(response) {
                console.log(response);
            })
        },
        _statusChangeCallback: function(response) {
            var self = this;
            console.log("_statusChangeCallback");
            console.log("status=" + response.status);
            console.log(response)
            if (response.status == "connected") {
                toastServices.show();
                self._getUserinfo().then(function(data) {
                    toastServices.hide();
                    self._save(data);
                });
            }
            // $rootScope.$emit("facebook_" + response.status, response);
        },
        _getUserinfo: function() {
            var deferred = $q.defer();
            console.log("_getUserinfo");
            var FB = $window.FB || undefined;
            if (!FB) return;
            FB.api("/me", {
                    fields: "id,email,name,picture,gender"
                },
                function(response) {
                    if (!response || response.error) {
                        console.log("reject")
                        deferred.reject('Error occured');
                    } else {
                        console.log("resolve")
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        },
        _save: function(data) {
            console.log(data)
                // save user info to server
            var query = {
                "uid": data.id,
                "u_type": 2,
                "email": data.email,
                "nickname": data.name,
                "icon_url": data.picture.data.url,
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
