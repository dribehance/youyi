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
        title:"测试通过",
        thumbnail:"http://www.uelives.com/youyi/images/ue_logo.png",
        link:"http://www.uelives.com/h5",
        desc:"悠译平台实现了不论消费者以何种目的出境（商务、旅行或其他），都可以随时随地发布翻译任务、搜索境外当地的翻译者——“悠译人”，需要翻译的顾客能与具备语言专长并且了解当地的“悠译人” 进行配对、轻松交易，从而打破语言和文化的壁垒，让出境更加容易，也让世界沟通无限。",
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
        "response_type": "code",
        "scope": "snsapi_userinfo",
        "state": "weixin",
        "wechat_redirect":"#wechat_redirect",
    }
});
