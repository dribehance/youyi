// by dribehance <dribehance.kksdapp.com>
var reportController = function($scope,errorServices,toastServices,localStorageService,config){
	
}
angular.module("Youyi").controller("reportUploadController", function($scope, localStorageService, config) {
    $scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
        flow.opts.target = config.url + "/app/TaskUser/comment";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "pic";
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "task_id":input.task_id,
            "type":input.type,
            "note":input.note,
            "details":input.details,
        }
        flow.upload();
    })
});