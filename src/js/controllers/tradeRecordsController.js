// by dribehance <dribehance.kksdapp.com>
var tradeRecordsController = function($scope,walletServices, errorServices, toastServices, localStorageService, config) {
	$scope.trade_records = [];
	$scope.page = {
		number:1,
		page_size:10,
		message:"Load More"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
	    toastServices.show();
	    $scope.page.message ="Loading";
	    walletServices.queryTradeRecords($scope.page).then(function(data) {
	        toastServices.hide();
	        $scope.page.message ="Load More";
	        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
	        	$scope.rate = data.rate;
	            $scope.trade_records = $scope.trade_records.concat(data.DealRecordResult.list);
	            $scope.no_more = $scope.trade_records.length == data.DealRecordResult.totalRow?true:false;
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
