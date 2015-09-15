// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("userServices", function($http, config) {
    return {
        signin: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/LoginResponse",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "name": input.username,
                    "password": input.password,
                    "language": "CN"
                })
            }).then(function(data) {
                return data.data;
            });
        },
        signupByTel: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/RegistTel",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "telephone": input.telephone,
                    "password": input.password,
                    "msg_code": input.sms_code,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        signupByEmail: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/RegistEmail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "email": input.email,
                    "password": input.password,
                    "email_code": input.email_code
                })
            }).then(function(data) {
                return data.data;
            });
        },
        forget: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/setPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.vertifycode,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        updateSigninPsd: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/ResetPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.vertifycode
                })
            }).then(function(data) {
                return data.data;
            });
        },
        updateTradePsd: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/setPayPassword",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "name": input.username,
                    "password": input.password,
                    "msg_code": input.vertifycode
                })
            }).then(function(data) {
                return data.data;
            });
        },
        verifycode: {
            getVerifycode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/GetForgetCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "name": input.username,
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            getSmscode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/getRegistTelCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "telephone": input.telephone,
                    })
                }).then(function(data) {
                    return data.data;
                });
            },
            getEmailcode: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/UserCenter/GetRegistEmailCode",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "email": input.email,
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        },
        info:{
            basic:function(input){
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/app/Person/info",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "language_app": "CN",
                        "token": input.token
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        }
    }
});
