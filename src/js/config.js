angular.module("Youyi").constant("config", {
    url: "http://120.24.237.130",
    imageUrl: "http://120.24.237.130/files/image?name=",
    request: {
        "SUCCESS": "200",
        "TOKEN_INVALID": "405"
    },
    response: {
        "SUCCESS": 1
    },
    share: {
        appkey: {
            sina: "",
            facebook: "",
        },
        gateway: "http://www.jiathis.com/send/",
        url: "http://dribehance.kksdapp.com",
    },
    common_params: {
        invoke: "h5"
    },
    weixin: {
        "base_url":"https://open.weixin.qq.com/connect/oauth2/authorize",
        "access_token_url":"https://api.weixin.qq.com/sns/oauth2/access_token",
        "userinfo_url":"https://api.weixin.qq.com/sns/userinfo",
        "appid": "wxfc4845662ab85927",
        "redirect_uri": "http://www.uelives.com/h5#/oauth",
        "response_type": "code",
        "scope": "snsapi_userinfo",
        "state": "reject",
        "wechat_redirect":"#wechat_redirect"
    }
});
