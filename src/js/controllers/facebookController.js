angular.module("Youyi").controller("facebookController", function($scope, $rootScope, facebookServices) {
    $rootScope.$on("redirect_by_facebook", redirect);
    $rootScope.$on("facebook_connect", facebook_connect);
    var facebook_connect = function(response) {
        facebookServices.getUserinfo().then(function(data) {
            // save user info to server
            console.log(data)
            var query = {
                "uid": data.id,
                "u_type": 2,
                "nickname": data.first_name,
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
        });
    }
    var redirect = function() {
    	
    }
})
