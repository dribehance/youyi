// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("settingServices", function($http, config, localStorageService) {
    return {
        ad: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Setting/ad",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "content":input.content,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        contact: function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/app/Setting/contactUs",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	        "token":localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "content":input.content,
                   	"type":input.type
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        }
    }
});
