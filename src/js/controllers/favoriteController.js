// by dribehance <dribehance.kksdapp.com>
var favoriteController = function($scope, myLoveServices, errorServices, toastServices, localStorageService, config) {
    $scope.translators = [];
    $scope.page = {
        number: 1,
        page_size: 10,
        message: "点击加载更多"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        myLoveServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.concat(data.CollectionList.list);
                $scope.no_more = $scope.translators.length == data.CollectionList.totalRow ? true : false;
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
    $scope.unlike = function(translator) {
        myLoveServices.cancel({
            "collection_id": translator.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.filter(function(t){
                	return t.collection_id != translator.collection_id;
                })
            } else {
                errorServices.autoHide("服务器错误");
            }
        })
    }
}
