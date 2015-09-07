// by dribehance <dribehance.kksdapp.com>
var indexController = function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.filter = {
        name: "",
        country: "hot",
        salary: "by_hour"
    }
    $scope.banners = ["../images/banner.png","ss","sdf"];
    // filter
    $scope.offset_top = "0px";
    $scope.$watch("filter.name",function(n,o) {
    	$scope.offset_top = $("#filter").offset().top - 16 +"px";
    })
    $scope.reset_filter = function() {
        $scope.filter.name = "";
    }
}
