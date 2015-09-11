// by dribehance <dribehance.kksdapp.com>
var meInfoController = function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.user = {
        cover: "../images/translator.png",
        nickname:"",
        realname:"",
        gender:"female",
        industry:"",
        telephone:"",
        email:"",
        district:""
    };
    // location
    $scope.countrys = [{
        name: "中国",
        city: ["深圳", "上海", "北京", "南京", "广州", "武汉", "吉林", "长春", "哈尔滨"]
    }, {
        name: "日本",
        city: ["东京", "横滨", "大阪"]
    }, {
        name: "韩国",
        city: ["韩城", "朝鲜", "汉城"]
    }];
    $scope.choosen = {};
    $scope.choosen.city = {
        name: "",
        country: "请选择"
    }
}
