// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("weixinServices", function($http, $rootScope, $location, toastServices, $window, oauthServices, localStorageService, config) {
    if (!$rootScope.wx_browser) return {};
    oauthServices.initWeixin($location.absUrl().split("#")[0]).then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $rootScope.timestamp = data.Result.item3.timestamp;
            $rootScope.nonceStr = data.Result.item3.nonceStr;
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.weixin.appid, // 必填，公众号的唯一标识
                timestamp: $rootScope.timestamp, // 必填，生成签名的时间戳
                nonceStr: $rootScope.nonceStr, // 必填，生成签名的随机串
                signature: data.Result.item3.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
    wx.ready(function() {
        // alert("initWeixinShareEvent")
        initWeixinShareEvent();
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });

    function initWeixinShareEvent(title, link, thumbnail, desc) {
        wx.onMenuShareTimeline({
            title: title || config.share.title, // 分享标题
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            trigger: function() {
                // alert("分享朋友圈")
            },
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    return {
        // share
        initWeixinShareEvent: function(title, link, thumbnail, desc) {
            initWeixinShareEvent(title, link, thumbnail, desc);
        },
        // login
        queryAuthorizationCode: function() {
            var url = config.weixin.base_url + "?" + "appid=" + config.weixin.appid + "&redirect_uri=" + encodeURIComponent(config.weixin.redirect_uri) + "&response_type=" + config.weixin.response_type + "&scope=" + config.weixin.scope + "&state=" + config.weixin.state + config.weixin.wechat_redirect;
            $window.location.href = url;
        },
        queryAccessToken: function(code) {
            // var url = config.weixin.access_token_url + "?" + "appid=" + config.weixin.appid + "&secret=" + config.weixin.secret + "&code=" + code + "&grant_type=" + "authorization_code";
            // $window.location.href = url;
            var url = config.weixin.access_token_url + "?appid=" + config.weixin.appid + "&secret=" + config.weixin.secret + "&code=" + code + "&grant_type=authorization_code";
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: url,
                method: "GET",
            }).then(function(data) {
                return data.data;
            });
        },
        queryUserinfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.weixin.userinfo_url,
                method: "GET",
                params: angular.extend({}, {
                    "access_token": input.access_token,
                    "openid": input.openid,
                    "lang": "zh_CN"
                })
            }).then(function(data) {
                return data.data;
            });
        },
        prepare_pay: function(payment) {
            var url = config.weixin.base_url + "?" + "appid=" + config.weixin.appid + "&redirect_uri=" + encodeURIComponent(config.weixin.payment_redirect_uri) + "&response_type=" + config.weixin.response_type + "&scope=" + config.weixin.scope + "&state=" + JSON.stringify(payment) + config.weixin.wechat_redirect;
            $window.location.href = url;
        },
        // payment
        pay: function(payment) {
            toastServices.show();
            wx.chooseWXPay({
                // "appId": payment.appId,//config.weixin.appid,
                "timestamp": payment.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                "nonceStr": payment.nonceStr, // 支付签名随机串，不长于 32 位
                "package": payment.package_web, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                "signType": payment.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                "paySign": payment.paySign, // 支付签名
                success: function(res) {
                    // 支付成功后的回调函数
                    toastServices.hide();
                    // alert(JSON.stringify(res))
                    alert("$location.path('tasks').replace();");
                    $location.path("tasks").replace();
                },
                fail: function(res) {
                    toastServices.hide();
                    $rootScope.back();
                    // alert("chooseWXPay fail");
                    // alert(JSON.stringify(res));
                }
            });
        }
    }
});
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
