// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("weiboServices", function($http, $q, $location, SharedState, toastServices, errorServices, localStorageService, userServices, config) {
    return {
        login: function() {
            var self = this;
            WB2.login(function() {
                // 验证是否登入成功
                if (WB2.checkLogin()) {
                    // api 入口
                    WB2.anyWhere(function(W) {
                        // 调用 account/get_uid 接口，获取用户信息
                        W.parseCMD('/account/get_uid.json', function(oResult, bStatus) {
                            if (bStatus) {
                                // 本地验证 uid 是否存在，如果存在则自动登入绑定账户，不存在则不做任何操作
                                self.queryUserInfo(oResult)
                            }
                        }, {}, {
                            method: 'get',
                            cache_time: 30
                        });
                    });
                }
            });

        },
        logout: function() {
            WB2.logout(function(response) {
                console.log(response)
            });
        },
        queryUserInfo: function(response) {
            var self = this;
            WB2.anyWhere(function(W) {
                W.parseCMD("/users/show.json", function(sResult, bStatus) {
                    if (bStatus) {
                        self._save(sResult);
                    } else {
                        console.log("save user info error")
                    }
                }, {
                    uid: response.uid,
                }, {
                    method: 'get'
                });
            });
        },
        _save: function(data) {
            // save user info to server
            var query = {
                "uid": data.id,
                "u_type": 0,
                "nickname": data.screen_name,
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