// by dribehance <dribehance.kksdapp.com>
var taskController = function($scope, $routeParams,$location, taskServices, errorServices, toastServices, localStorageService, config) {
    toastServices.show();
    taskServices.queryById({task_id:$routeParams.task_id}).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
        	$scope.task = data.taskDetail;
        } else {
            errorServices.autoHide("服务器错误");
        }
    });
    $scope.apply = function() {
    	toastServices.show();
    	taskServices.apply({"task_id":$routeParams.task_id}).then(function(data){
    		toastServices.hide()
    		if(data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
    			$location.path("tasks").replace();	
    		}
    		else {
    			errorServices.autoHide("服务器错误");
    		}
    	})
    }
}
