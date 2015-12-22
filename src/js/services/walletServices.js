// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("walletServices", function($http, localStorageService, config) {
    return {
        query: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/myMoney",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                })
            }).then(function(data) {
                return data.data;
            });
        },
        cash: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/applyMoney",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "money": input.money,
                    "bank": input.bank_name,
                    "bankcard": input.bank_cardno,
                    "username": input.realname,
                    "pay_passwrod": input.password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        cash_records: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/applyRecord",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "pn": input.pn,
                    "page_size": input.page_size
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryTradeRecords: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/dealRecord",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "language_app": localStorageService.get("language"),
                    "pn": input.number,
                    "page_size": input.page_size
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryBankById:function(input) {
            // input->bank_car_id
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Banks/bankCarInfo",
                method: "GET",
                params: angular.extend({}, config.common_params,{
                    token:localStorageService.get("token"),
                    language_app:localStorageService.get("language")
                }, input)
            }).then(function(data) {
                return data.data;
            });
        },
        updateBank:function(input) {
            // bank->bank_name,bank_no,bank_user_name,bank_telephone
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Banks/addBank",
                method: "GET",
                params: angular.extend({}, config.common_params,{
                    token:localStorageService.get("token"),
                    language_app:localStorageService.get("language")
                }, input)
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
