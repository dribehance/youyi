// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").controller("sidebarController", function($scope, $window, $timeout, $rootScope, $location, $route, weiboServices, weixinServices, facebookServices, userServices, SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.sidebar = {
        current: "entrance",
        last: "",
        error: {
            show: false,
            message: ""
        }
    };
    $scope.sidebar.share = {
        socialshare: false,
        weixin: false,
        sina: config.share.jiathis_gateway + "?webid=tsina&appkey=" + config.share.sina_appkey + "&url=" + config.share.link + "&title=" + encodeURIComponent(config.share.title) + "&summary=" + encodeURIComponent(config.share.desc) + "&pic=" + config.share.thumbnail,
        facebook: config.share.jiathis_gateway + "?webid=fb&appkey=" + config.share.facebook_appkey + "&url=" + config.share.link + "&title=" + encodeURIComponent(config.share.title) + "&summary=" + encodeURIComponent(config.share.desc) + "&pic=" + config.share.thumbnail,
    }
    $scope.state = [];
    $scope.prev = function() {
        $scope.state = $scope.state.slice(0, $scope.state.length - 1)
            // var state = $scope.state.pop();
        $scope.sidebar.current = $scope.state[$scope.state.length - 1] || "entrance";
        $timeout(function() {
            SharedState.turnOn("uiSidebarLeft")
        }, 0)
    }
    $scope.show = function(state) {
        $scope.state.push(state);
        // $scope.sidebar.last = $scope.sidebar.current;
        $scope.sidebar.current = state;
    }
    $scope.share = function() {
            $scope.sidebar.share.socialshare = !$scope.sidebar.share.socialshare;
        }
        // counting
    $scope.callbackTimer = {};
    $scope.callbackTimer.counting = 0;
    $scope.callbackTimer.finish = function() {
        $scope.callbackTimer.counting = 0;
        $scope.$apply();
    }
    $scope.callbackTimer.addSeconds = function(seconds) {
        angular.element("#kkcountdown")[0].clear();
        angular.element("#kkcountdown")[0].resume();
        angular.element("#kkcountdown")[0].start();
    };
    // user input
    $scope.input = {};
    $scope.input = {
        username: "",
        telephone: "",
        email: "",
        password: "",
        sms_code: "",
        email_code: "",
        verifycode: "",

    }
    $scope.getSmscode = function() {
        userServices.verifycode.getSmscode($scope.input).then(function(data) {
            if (data.status == config.response.SUCCESS) {
                console.log("验证码" + data.tel_code);
                $scope.callbackTimer.counting = 1;
                $scope.callbackTimer.addSeconds(60);
                $scope.sidebar.error.show = false;
                // errorServices.autoHide("验证码发送成功");
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.getEmailcode = function() {
        toastServices.show();
        userServices.verifycode.getEmailcode($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
                console.log("验证码" + data.email_code);
                $scope.callbackTimer.counting = 1;
                $scope.callbackTimer.addSeconds(60);
                // errorServices.autoHide("验证码发送成功");        
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.getVerifycode = function() {
        toastServices.show();
        userServices.verifycode.getVerifycode($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
                console.log("验证码" + data.code);
                $scope.callbackTimer.counting = 1;
                $scope.callbackTimer.addSeconds(60);
                // errorServices.autoHide("验证码发送成功");        
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.ajaxForm = function(form) {
        switch (form) {
            case "signup_by_tel":
                $scope.signupByTel();
                break;
            case "signup_by_email":
                $scope.signupByEmail();
                break;
            case "signin":
                $scope.signin();
                break;
            case "forget":
                $scope.forget();
                break;
            default:
                ;
        }
    };
    $scope.signupByTel = function() {
        toastServices.show();
        userServices.signupByTel($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
                SharedState.turnOff("uiSidebarLeft");
                // errorServices.autoHide("注册成功");
                localStorageService.set("token", data.user.token);
                userServices.sync();
                $scope.input = {};
                $location.path("me_info")
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    };
    $scope.signupByEmail = function() {
        toastServices.show();
        userServices.signupByEmail($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
              SharedState.turnOff("uiSidebarLeft");
                // errorServices.autoHide("注册成功");
                localStorageService.set("token", data.user.token);
                userServices.sync();
                $scope.input = {};
                $location.path("me_info")  
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.signin = function() {
        toastServices.show();
        $scope.loading = true;
        userServices.signin($scope.input).then(function(data) {
            $scope.loading = false;
            toastServices.hide()
            if (data.status == 2) {
                SharedState.turnOff("uiSidebarLeft");
                localStorageService.set("token", data.token);
                userServices.sync();
                $scope.input = {};
                $route.reload();
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    };
    $scope.forget = function() {
        toastServices.show();
        userServices.forget($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {
                SharedState.turnOff("uiSidebarLeft");
            } else {
                errorServices.autoHide(data.message);
                // $scope.sidebar.error.show = true;
                // $scope.sidebar.error.message = data.message;
            }
        })
    };
    // open uiSidebarLeft
    $scope.$on("mobile-angular-ui.state.changed.uiSidebarLeft", function(e, n, o) {
        $scope.sidebar.error.show = false;
        $scope.sidebar.error.message = "";
        if (n === true) {
            // alert("true")
            $rootScope.cover.show = true;
            $scope.sidebar.current = localStorageService.get("token") ? "login" : "entrance"
        } else {
            // alert("false")
            $rootScope.cover.show = false;
        }
    })
    $scope.$watch("sidebar.current", function(n, o) {
        if (angular.element("#kkcountdown").length > 0) {
            $scope.callbackTimer.counting = 0;
            angular.element("#kkcountdown")[0].resume();
        }
    });
    $scope.weixinLogin = function() {
        weixinServices.queryAuthorizationCode && weixinServices.queryAuthorizationCode();
    };
    $scope.weixinShare = function() {
        $scope.sidebar.share.weixin = !$scope.sidebar.share.weixin;
    };
    $scope.facebookLogin = function() {
        facebookServices.login();
    };
    $scope.facebookShare = function() {
        facebookServices.share();
    }
    $scope.weiboLogin = function() {
        // weiboServices.login();
        weiboServices.queryAuthorizationCode && weiboServices.queryAuthorizationCode();
    };
    // $scope.weiboShare = function() {
    //     console.log("weiboShare")
    //     $window.location.href = $scope.sidebar.share.sina;
    // };
    // $scope.weixinOauthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfc4845662ab85927&redirect_uri=http%3A%2F%2Fwww.uelives.com%2Fh5%23%2Foauth&response_type=code&scope=snsapi_userinfo&state=reject#wechat_redirect";
})
