// by dribehance <dribehance.kksdapp.com>
var applicantsController = function($scope, $routeParams, myLoveServices, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.applicants = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多",
        task_id: $routeParams.task_id
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        taskServices.queryApplicantsByTask($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.applicants = $scope.applicants.concat(data.RequestList.list);
                $scope.no_more = $scope.applicants.length == data.RequestList.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
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
