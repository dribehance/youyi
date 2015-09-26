// by dribehance <dribehance.kksdapp.com>
var reportController = function($scope, $routeParams, errorServices, toastServices, localStorageService, config) {
    $scope.reports = [{
        title: "态度恶劣，出现侮辱性语言",
        selected: false,
        type: 1,
    }, {
        title: "欺骗行为",
        selected: false,
        type: 2,
    }, {
        title: "侵犯行为",
        selected: false,
        type: 3,
    }, {
        title: "其他原因",
        selected: false,
        type: 4,
    }];
    $scope.input = {
        details: "",
        other: "",
        task_id: $routeParams.task_id
    };
    $scope.toggle = function(report) {
        report.selected = !report.selected;
        if ($scope.reports[3].selected) {
            $scope.input.other_show = true;
        } else {
            $scope.input.other_show = false;
        }
    }
}
angular.module("Youyi").controller("reportUploadController", function($scope, toastServices, errorServices, localStorageService, config) {
    $scope.$on("flow::fileSuccess", function(file, message, chunk) {
        console.log(message)
        toastServices.hide();
        errorServices.autoHide("上传成功");
    })
    $scope.$on("flow::fileError", function(file, message, chunk) {
        toastServices.hide();
        errorServices.autoHide("上传失败");
    })
    $scope.ajaxForm = function(flow) {
        $scope.input.type = $scope.reports.filter(function(report) {
            return report.selected;
        }).map(function(report){
            return report.type;
        }).join(",")
        if (flow.files.length == 0) {
            errorServices.autoHide("至少上传一张图片证据");
            return;
        }
        flow.opts.target = config.url + "/app/TaskUser/complaint";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "pic";
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "invoke": "h5",
            "language_app": localStorageService.get("language"),
            "task_id": $scope.input.task_id,
            "type": $scope.input.type,
            "note": $scope.input.other,
            "details": $scope.input.details,
        }
        toastServices.show();
        flow.upload();
    }
});
