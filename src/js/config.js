angular.module("Youyi").constant("config", {
    url: "http://120.24.237.130:8080",
    imageUrl: "http://120.24.237.130:8080/files/image?name=",
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
        invoke:"h5"
    },
});
