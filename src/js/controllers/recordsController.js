// by dribehance <dribehance.kksdapp.com>
var recordsController = function($scope,walletServices, errorServices, toastServices, localStorageService, config) {
	$scope.records = [];
	$scope.page = {
		number:1,
		page_size:1,
		message:"点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
	    toastServices.show();
	    $scope.page.message ="正在加载...";
	    walletServices.cash_records($scope.page).then(function(data) {
	        toastServices.hide();
	        $scope.page.message ="点击加载更多";
	        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
	            $scope.records = $scope.records.concat(data.Response.list);
	            $scope.no_more = $scope.records.length == data.Response.totalRow?true:false;
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
}
