// by dribehance <dribehance.kksdapp.com>
var commentController = function($scope,errorServices,toastServices,localStorageService,config){
	$scope.input = {};
	$scope.input.level = "good";
	$scope.level = function(level) {
		$scope.input.level = level;
	}
}
angular.module("Youyi").controller("commentUploadController", function($scope, localStorageService, config) {
    $scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
        flow.opts.target = config.url + "/app/TaskUser/comment";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "pic";
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "task_id":input.task_id,
            "group_id":input.group_id,
            "note":input.note,
            "service":input.service,
            "profession":input.profession,
            "tongue":input.tongue,
            "task_user_id":input.task_user_id,
            "tag_group_id_list":input.tag_group_id_list,

        }
        flow.upload();
    })
});