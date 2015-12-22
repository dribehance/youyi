angular.module("Youyi").constant("config", {
    url: "http://www.uelives.com",
    imageUrl: "http://www.uelives.com/files/image?name=",
    request: {
        "SUCCESS": "200",
        "TOKEN_INVALID": "405"
    },
    response: {
        "SUCCESS": 1
    },
    common_params: {
        invoke: "h5"
    },
    share:{
        title:"【UE Lives】",
        thumbnail:"http://www.uelives.com/youyi/images/ue_logo.png",
        link:"http://www.uelives.com/h5",
        desc:"全球O2O跨境翻译社交平台",
        sina_appkey:"622824244",
        facebook_appkey:"1692835377595486",
        jiathis_gateway: "http://www.jiathis.com/send/",     
    },
    weixin: {
        "base_url":"https://open.weixin.qq.com/connect/oauth2/authorize",
        "access_token_url":"https://api.weixin.qq.com/sns/oauth2/access_token",
        "userinfo_url":"https://api.weixin.qq.com/sns/userinfo",
        "appid": "wxfc4845662ab85927",
        "secret":"1428c0468f80f233c7f17d887582f2f6",
        "redirect_uri": "http://www.uelives.com/oauth",
        "payment_redirect_uri": "http://www.uelives.com/h5#/payment",
        "response_type": "code",
        "scope": "snsapi_userinfo",
        "state": "weixin",
        "wechat_redirect":"#wechat_redirect",
    }
});
