// by dribehance <dribehance.kksdapp.com>
var searchTranslatorsController = function($scope, $routeParams, $location, SharedState, translatorServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.translators = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多",
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
        $scope.page.message = "正在加载...";
        translatorServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.concat(data.Result.persons.list);
                $scope.no_more = $scope.translators.length == data.Result.persons.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    $scope.search = function() {
        if (!$scope.page.kw) {
            return
        }
        $location.path("search/translators/" + $scope.page.kw).replace();
    }
}
