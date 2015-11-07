// by dribehance <dribehance.kksdapp.com>
var recommandsController = function($scope,$routeParams,$location, taskServices, myLoveServices, errorServices, toastServices, localStorageService, config) {
    $scope.recommands = [];
    $scope.page = {
        number: 1,
        page_size: 10,
        message: "Load More"
    }
    $scope.page = angular.extend({}, $scope.page, localStorageService.get("recommand"))
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "Loading";
        taskServices.queryRecommandTask($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.recommands = $scope.recommands.concat(data.Result.recommends.list);
                $scope.no_more = $scope.recommands.length == data.Result.recommends.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "No More";
            }
            $scope.page.number++;
        })

    }
    $scope.loadMore();
    $scope.apply = function(recommend) {
        if (recommend != "0") {
            return;
        }
        toastServices.show();
        taskServices.invite({
            "task_id": $routeParams.task_id,
            "yy_user_id":recommend.user_id,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $location.path("tasks").replace();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.unlike = function(applicant) {
        myLoveServices.cancel({
            "collection_id": applicant.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                applicant.is_collect = 0
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.like = function(applicant) {
        myLoveServices.like({
            "collection_user_id": applicant.user_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                applicant.is_collect = 1,
                    applicant.collection_id = data.collection_id;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    // preview translator
    $scope.preview_translator = function(translator_id) {
        $location.path("translators/" + translator_id).search("to", "preview")
    };
}
