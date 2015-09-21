// by dribehance <dribehance.kksdapp.com>
var recommandsController = function($scope, taskServices, myLoveServices, errorServices, toastServices, localStorageService, config) {
    $scope.recommands = [];
    $scope.page = {
        number: 1,
        page_size: 10,
        message: "点击加载更多"
    }
    $scope.page = angular.extend({}, $scope.page, localStorageService.get("recommand"))
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        taskServices.queryRecommandTask($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.recommands = $scope.recommands.concat(data.Result.recommends.list);
                $scope.no_more = $scope.recommands.length == data.Result.recommends.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.number++;
        })

    }
    $scope.loadMore();
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
}
