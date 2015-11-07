// by dribehance <dribehance.kksdapp.com>
var searchController = function($scope, $routeParams, $location, SharedState, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.tasks = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "Load More",
        filter_language_group_id: "",
        filter_place_group_id: "",
        filter_type_group_id: "",
        filter_money: "",
        kw: $routeParams.kw
    };
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "Loading";
        taskServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "No More";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    $scope.search = function() {
        if (!$scope.page.kw) {
            return
        }
        $location.path("search/" + $scope.page.kw).replace();
    }
}
