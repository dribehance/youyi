// by dribehance <dribehance.kksdapp.com>
var recordsController = function($scope,walletServices, errorServices, toastServices, localStorageService, config) {
	$scope.records = [];
	$scope.page = {
		number:1,
		page_size: 10,
		message:"Load More"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
	    toastServices.show();
	    $scope.page.message ="Loading";
	    walletServices.cash_records($scope.page).then(function(data) {
	        toastServices.hide();
	        $scope.page.message ="Load More";
	        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
	            $scope.records = $scope.records.concat(data.Response.list);
	            $scope.no_more = $scope.records.length == data.Response.totalRow?true:false;
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
}
