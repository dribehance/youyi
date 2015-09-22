// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").controller("sidebarController", function($scope, $timeout, $rootScope,$location, userServices, SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.sidebar = {
        current:"entrance",
        last: "",
        error:{
            show:false,
            message:""
        }
    };
    $scope.title = "【dribehance】";
    $scope.summary = "share by dribehance";
    $scope.imageUrl = "http://www.cto9.com/upFiles/infoImg/coll/20141030/OT20141030114721229.jpg";
    $scope.sidebar.share = {
        socialshare: false,
        weixin: false,
        sina: config.share.gateway + "?webid=tsina&appkey=" + config.share.appkey.sina + "&url=" + config.share.url + "&title=" + $scope.title + "&summary=" + $scope.summary + "&pic=" + $scope.imageUrl,
        facebook: config.share.gateway + "?webid=fb&appkey=" + config.share.appkey.facebook + "&url=" + config.share.url + "&title=" + $scope.title + "&summary=" + $scope.summary + "&pic=" + $scope.imageUrl,
    }
    $scope.prev = function() {
        $scope.sidebar.current = $scope.sidebar.last;
        $timeout(function() {
            SharedState.turnOn("uiSidebarLeft")
        }, 0)
    }
    $scope.show = function(state) {
        $scope.sidebar.last = $scope.sidebar.current;
        $scope.sidebar.current = state;
    }
    $scope.share = function() {
        $scope.sidebar.share.socialshare = !$scope.sidebar.share.socialshare;
    }
    $scope.share_weixin = function() {
        $scope.sidebar.share.weixin = !$scope.sidebar.share.weixin;
    };
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
        username:"",
        telephone: "",
        email: "",
        password: "",
        sms_code: "",
        email_code:"",
        verifycode:"",

    }
    $scope.getSmscode = function() {
        userServices.verifycode.getSmscode($scope.input).then(function(data) {
            if (data.status == config.response.SUCCESS) {
                console.log("验证码"+data.tel_code);
                errorServices.autoHide("验证码发送成功");
            } else {
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(60);
    }
    $scope.getEmailcode = function() {
        toastServices.show();
        userServices.verifycode.getEmailcode($scope.input).then(function(data){
            toastServices.hide()
            if(data.status == config.response.SUCCESS) {
                console.log("验证码"+data.code);
                errorServices.autoHide("验证码发送成功");        
            }
            else {
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(60);
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
                errorServices.autoHide("注册成功");
                localStorageService.set("token",data.user.token);
            } else {
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
            }
        })
    };
    $scope.signupByEmail = function() {
        toastServices.show();
        userServices.signupByEmail($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == config.response.SUCCESS) {

            } else {
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
            }
        })
    }
    $scope.signin = function() {
        toastServices.show();
        userServices.signin($scope.input).then(function(data) {
            toastServices.hide()
            if (data.status == 2) {
                SharedState.turnOff("uiSidebarLeft");
                localStorageService.set("token",data.token);
                userServices.sync();
            } else {
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
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
                // errorServices.autoHide(data.message);
                $scope.sidebar.error.show = true;
                $scope.sidebar.error.message = data.message;
            }
        })
    };
    // open uiSidebarLeft
    $scope.$on("mobile-angular-ui.state.changed.uiSidebarLeft",function(e,n,o){
        $scope.sidebar.error.show = false;
        $scope.sidebar.error.message = "";
        if (n === true) {
            // alert("true")
            $rootScope.cover.show = true;
            $scope.sidebar.current = localStorageService.get("token")?"login":"entrance"
        }
        else {
            // alert("false")
            $rootScope.cover.show = false;
        }
    })
    $scope.$watch("sidebar.current",function(n,o){
        if (angular.element("#kkcountdown").length>0) {
            $scope.callbackTimer.counting = 0;
            angular.element("#kkcountdown")[0].resume();
        }
    })
    $scope.to = function(path) {
        
        $timeout(function(){
            $location.path(path)
        },0)
    }
})
