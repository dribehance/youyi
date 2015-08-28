// by dribehance <dribehance.kksdapp.com>
var indexController = function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.filter = {
        name: "",
        country: "hot",
        salary: "by_hour"
    }
    $scope.reset_filter = function() {
        $scope.filter.name = "";
    }
}
