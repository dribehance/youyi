// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").controller("sidebarController",function($scope,$timeout,$rootScope,SharedState,errorServices,toastServices,localStorageService,config){
	$scope.sidebar = {
		current:"login",
		last:""
	};
	$scope.prev = function() {
		$scope.sidebar.current = $scope.sidebar.last;
		$timeout(function(){
			SharedState.turnOn("uiSidebarLeft")
		},0)
	}
	$scope.show = function(state) {
		$scope.sidebar.last = $scope.sidebar.current;
		$scope.sidebar.current = state;
	}
	$scope.$on("mobile-angular-ui.state.changed.uiSidebarLeft",function(e,n,o){
		if (n === true) {
			console.log("open")
		}
	})
})