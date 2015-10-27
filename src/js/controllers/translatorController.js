// by dribehance <dribehance.kksdapp.com>
var translatorController = function($scope, $routeParams, $location, SharedState, translatorServices, myLoveServices, errorServices, toastServices, localStorageService, config) {
    $scope.to = $routeParams.to;
    $scope.authens = [];
    toastServices.show();
    translatorServices.queryById({
        "youyi_user_id": $routeParams.translator_id
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.translator = data.YyPersonInfo.user;
            $scope.translator.user_languages_list = data.YyPersonInfo.user_languages_list;
            $scope.translator.translate_type_list = data.YyPersonInfo.translate_type_list;
            $scope.translator.experiences = data.YyPersonInfo.experiences
            $scope.translator.commentTags = data.YyPersonInfo.commentTags;
            $scope.translator.commentUsers = data.YyPersonInfo.commentUsers;
            $scope.authens.push($scope.translator.identity_front, $scope.translator.language_identity, $scope.translator.profession_identity, $scope.translator.advanced_identity);
            $scope.authens = $scope.authens.filter(function(authen) {
                return authen != "";
            })
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.commentStars = function(length) {
        length = length || "0";
        return new Array(length)
    };
    $scope.preview = function(images) {
        $scope.preview_images = images;
        SharedState.turnOn("preview_panel")
    }
    $scope.like = function() {
        myLoveServices.like({
            "collection_user_id": $routeParams.translator_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translator.collection_id = data.collection_id;
                $scope.translator.is_collection = 1;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.unlike = function() {
        myLoveServices.cancel({
            "collection_id": $scope.translator.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translator.is_collection = 0;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // apply
    $scope.apply = function() {
        if (!localStorageService.get("token")) {
            $location.search("uiSidebarLeft");
            return;
        }
        $location.path("apply_flow").search("translator_id", $scope.translator.user_id);
    };
    // share
    $scope.share_footer = {};
    $scope.title = "【dribehance】";
    $scope.summary = "share by dribehance";
    $scope.imageUrl = "http://www.cto9.com/upFiles/infoImg/coll/20141030/OT20141030114721229.jpg";
    $scope.share_footer.share = {
        socialshare: false,
        weixin: false,
        sina: config.share.gateway + "?webid=tsina&appkey=" + config.share.appkey.sina + "&url=" + config.share.url + "&title=" + $scope.title + "&summary=" + $scope.summary + "&pic=" + $scope.imageUrl,
        facebook: config.share.gateway + "?webid=fb&appkey=" + config.share.appkey.facebook + "&url=" + config.share.url + "&title=" + $scope.title + "&summary=" + $scope.summary + "&pic=" + $scope.imageUrl,
    }
}
