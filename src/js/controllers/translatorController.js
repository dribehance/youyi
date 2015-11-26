// by dribehance <dribehance.kksdapp.com>
var translatorController = function($scope, $routeParams, $location, facebookServices, SharedState, translatorServices, myLoveServices, errorServices, toastServices, localStorageService, config) {
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
            $scope.translator.userIdentities = data.YyPersonInfo.userIdentities;
            $scope.translator.userIdentities.map(function(identity) {
                if (identity.type == 1) {
                    $scope.pass_language_authen = true;
                }
                if (identity.type == 3) {
                    $scope.pass_industry_authen = true;
                }
                return identity;
            });
            var count = 0;
            if ($scope.pass_language_authen) count++;
            if ($scope.pass_industry_authen) count++;
            if ($scope.translator.identity_status == "3") count++;
            $scope.authen_count = count;
            // $scope.authens.push($scope.translator.identity_front, $scope.translator.language_identity, $scope.translator.profession_identity, $scope.translator.advanced_identity);
            // $scope.authens = $scope.authens.filter(function(authen) {
            //     return authen != "";
            // })
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
    $scope.facebookShare = function() {
        facebookServices.share($location.absUrl());
    };
    $scope.share_footer.share = {
        socialshare: false,
        weixin: false,
        sina: config.share.jiathis_gateway + "?webid=tsina&appkey=" + config.share.sina_appkey + "&url=" + encodeURIComponent($location.absUrl()) + "&title=" + config.share.title + "&summary=" + config.share.desc + "&pic=" + config.share.thumbnail,
        facebook: config.share.jiathis_gateway + "?webid=fb&appkey=" + config.share.facebook_appkey + "&url=" + config.share.link + "&title=" + config.share.title + "&summary=" + config.share.desc + "&pic=" + config.share.thumbnail,
    };
}
