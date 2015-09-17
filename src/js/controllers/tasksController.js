// by dribehance <dribehance.kksdapp.com>
var tasksController = function($scope, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.task_tab = {
        name: "release"
    }
    $scope.tasks = [];
    $scope.page = {
        pn: 1,
        page_size: 3,
        message: "点击加载更多"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        taskServices.queryTaskByRelease($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
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
}
