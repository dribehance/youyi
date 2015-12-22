// by dribehance <dribehance.kksdapp.com>
var taskController = function($scope, $routeParams,$location, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.from = $routeParams.from; 
    $scope.task_id = $routeParams.task_id;
    toastServices.show();
    taskServices.queryById({task_id:$routeParams.task_id}).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
        	$scope.task = data.taskDetail;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.apply = function() {
    	toastServices.show();
    	taskServices.apply({"task_id":$routeParams.task_id}).then(function(data){
    		toastServices.hide()
    		if(data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
    			$location.path("tasks").search("from","task").replace();	
    		}
    		else {
    			errorServices.autoHide(data.message);
    		}
    	})
    }
    if ($scope.from == 'tasks') {
        toastServices.show();
        taskServices.queryApplicantsAvatarByTask({
            task_id: $routeParams.task_id
        }).then(function(data){
            toastServices.hide()
            if(data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.task_request_users = data.Result.requester;
                $scope.task_contact_request_status = data.contact_request_status;
                $scope.task_contact_request = data.contact_request;
            }
            else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
