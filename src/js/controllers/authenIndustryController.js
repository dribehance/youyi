// by dribehance <dribehance.kksdapp.com>
var authenIndustryController = function($scope,errorServices,toastServices,localStorageService,config){
	
}
angular.module("Youyi").controller("authenIndustryUploadController", function($scope, $rootScope, $timeout,toastServices, localStorageService, errorServices, config) {
    $scope.$on("flow::fileSuccess", function() {
        toastServices.hide();
        errorServices.autoHide("上传成功，等待审核！")
        $timeout(function() {
            $rootScope.back();
        }, 2000);
    })
    $scope.ajaxForm = function(flow) {
        if (flow.files.length > 2) {
            flow.cancel();
            errorServices.autoHide("上传文件个数过多");
            return;
        }
        // upload
        flow.opts.target = config.url + "/app/Person/uploadProfessionIdentity";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "profession_identity";
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