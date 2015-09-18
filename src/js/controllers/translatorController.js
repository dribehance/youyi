// by dribehance <dribehance.kksdapp.com>
var translatorController = function($scope, $routeParams, translatorServices, errorServices, toastServices, localStorageService, config) {
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
            console.log($scope.authens)
        } else {
            errorServices.autoHide("服务器错误");
        }
    })
	$scope.commentStars = function(length){
		length = length || "0";
		return new Array(length)
	};
}
