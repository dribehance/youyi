// by dribehance <dribehance.kksdapp.com>
var reportController = function($scope, $routeParams, errorServices, toastServices, localStorageService, config) {
    $scope.reports = [{
        title: "Bad Attitude",
        selected: true,
        type: 1,
    }, {
        title: "Cheating",
        selected: false,
        type: 2,
    }, {
        title: "Infringement",
        selected: false,
        type: 3,
    }, {
        title: "Other Reasons",
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
        var selected = $scope.reports.filter(function(report) {
            return report.selected;
        })
        if(selected.length == 0) {
            report.selected = true;
        }
        if ($scope.reports[3].selected) {
            $scope.input.other_show = true;
        } else {
            $scope.input.other_show = false;
        }
    }
}
angular.module("Youyi").controller("reportUploadController", function($scope,$rootScope, toastServices, errorServices, localStorageService, config) {
    $scope.$on("flow::fileSuccess", function(file, message, chunk) {
        toastServices.hide();
        errorServices.autoHide("上传成功");
        $rootScope.back();
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
        if ($scope.input.details =="") {
            errorServices.autoHide("详细描述您遇到的问题我们才能帮到您哦！");
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
