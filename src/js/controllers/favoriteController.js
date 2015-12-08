// by dribehance <dribehance.kksdapp.com>
var favoriteController = function($scope,$location, myLoveServices, errorServices, toastServices, localStorageService, config) {
    $scope.translators = [];
    $scope.page = {
        number: 1,
        page_size: 10,
        message: "Load More"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "Loading";
        myLoveServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.concat(data.CollectionList.list);
                $scope.no_more = $scope.translators.length == data.CollectionList.totalRow ? true : false;
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
    $scope.unlike = function(translator) {
        myLoveServices.cancel({
            "collection_id": translator.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.translators = $scope.translators.filter(function(t) {
                    return t.collection_id != translator.collection_id;
                });
                errorServices.autoHide(data.message)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // apply
    $scope.apply = function(translator_id) {
        if (!localStorageService.get("token")) {
            $location.search("uiSidebarLeft");
            return;
        }
        $location.path("apply_flow").search("translator_id", translator_id);
    };
    $scope.preview_translator = function(id) {
        $location.path("translators/"+id);
    }
}
