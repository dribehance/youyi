// by dribehance <dribehance.kksdapp.com>
var commentController = function($scope,errorServices,toastServices,localStorageService,config){
	$scope.input = {};
	$scope.input.level = "good";
	$scope.level = function(level) {
		$scope.input.level = level;
	}
}