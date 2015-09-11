// by dribehance <dribehance.kksdapp.com>
var authenNameController = function($scope,errorServices,toastServices,localStorageService,config){
	$scope.is_authen = false;
}
angular.module("Youyi").controller("authenUploadController", function($scope, $rootScope, $timeout, localStorageService, errorServices, config) {
    $scope.$on("flow::fileSuccess", function() {
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
        flow.opts.target = config.url + "/app/UserCenter/identity";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "identify_cards";
        flow.opts.query = {
            "token": localStorageService.get("token")
        };
        flow.upload();
    };
})