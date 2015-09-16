// by dribehance <dribehance.kksdapp.com>
var meInfoController = function($scope, $rootScope,SharedState, userServices, taskServices, errorServices, toastServices, localStorageService, config) {

    // location
    $scope.countries = [];
    taskServices.location().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.countries = data.Result.countries;

        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.input = {};
    $scope.input.choosen_city = {};
    $scope.ajaxForm = function() {
        toastServices.show();
        var input = angular.extend({},$rootScope.user,{
            "city_dict_id":$scope.input.choosen_city.city_dict_id
        });
        userServices.info.updateBasic(input).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    $scope.choosen_city = function() {
        $rootScope.user.country = $scope.countries[$scope.choosen_country_index].country;
        $rootScope.user.city = $scope.input.choosen_city.city;
        SharedState.turnOff("district_panel");
    }
    $scope.outerIndex = function(index) {
        $scope.choosen_country_index = index
    }
}
