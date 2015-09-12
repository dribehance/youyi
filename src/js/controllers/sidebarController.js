// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").controller("sidebarController", function($scope, $timeout, $rootScope, SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.sidebar = {
        current: "login",
        last: ""
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
    }
})
