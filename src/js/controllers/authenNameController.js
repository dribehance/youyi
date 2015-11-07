// by dribehance <dribehance.kksdapp.com>
var authenNameController = function($scope,errorServices,toastServices,localStorageService,config){
	$scope.is_authen = false;
}
angular.module("Youyi").controller("authenUploadController", function($scope, $rootScope, $timeout,toastServices, localStorageService, errorServices, config) {
    $scope.$on("flow::fileSuccess", function() {
        toastServices.hide();
        errorServices.autoHide("上传成功，等待审核！")
        $timeout(function() {
            $rootScope.back();
        }, 2000);
    })
    $scope.ajaxForm = function(flow) {
        // upload
        flow.opts.target = config.url + "/app/Person/uploadIdentity";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "identity_front";
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "language_app":localStorageService.get("language"),
            "invoke":"h5"
        };
        toastServices.show();
        errorServices.show("上传中");
        flow.upload();
    };
})