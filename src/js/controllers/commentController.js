// by dribehance <dribehance.kksdapp.com>
var commentController = function($scope, $rootScope, $routeParams, commentServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        task_id: $routeParams.task_id,
        note: "",
        service: "",
        tag: "",
        level: {},
        star: {
            service: 5,
            profession: 5,
            language: 5
        }
    };
    toastServices.show();
    commentServices.queryTags({
        task_id: $routeParams.task_id,
        user_id: $routeParams.user_id
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.task = data.Result.avatarTitle;
            $scope.tags = data.Result.tagDicts;
            $scope.tags = $scope.tags.map(function(tag) {
                tag.selected = false;
                return tag;
            })
            $scope.levels = data.Result.gradeDicts;
            $scope.input.level = $scope.levels[0];
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.grade = function(level) {
        $scope.input.level = level;
    }
    $scope.rate = function(name, index) {
        switch (name) {
            case "service":
                $scope.input.star.service = index;
                break;
            case "profession":
                $scope.input.star.profession = index;
                break;
            case "language":
                $scope.input.star.language = index;
                break;
            default:
                ;

        }
    }
    $scope.fiveStar = function() {
        return new Array(5);
    }
    $scope.toggleTag = function(tag) {
        tag.selected = !tag.selected;
        return tag;
    }
}
angular.module("Youyi").controller("commentUploadController", function($rootScope, $filter, $routeParams, $scope, errorServices, toastServices, localStorageService, config) {
    $scope.releaseComment = function(flow) {
        if ($scope.input.note == "") {
            var tip = $filter("translate")("No Comments Submitted yet");
            errorServices.autoHide(tip);
            return;
        }
        if (flow.files.length == 0) {
            tip = $filter("translate")("Upload at Least One Photo");
            errorServices.autoHide(tip);
            return;
        }
        $scope.input.tags = $scope.tags.filter(function(tag) {
            return tag.selected;
        }).map(function(t) {
            return t.group_id;
        }).join("#")
        flow.opts.target = config.url + "/app/TaskUser/comment";
        flow.opts.testChunks = false;
        flow.opts.fileParameterName = "pic";
        flow.opts.query = {
            "token": localStorageService.get("token"),
            "language_app": localStorageService.get("language"),
            "task_id": $scope.input.task_id,
            "group_id": $scope.input.level.group_id,
            "note": $scope.input.note,
            "service": parseFloat($scope.input.star.service) + 1,
            "profession": parseFloat($scope.input.star.profession) + 1,
            "tongue": parseFloat($scope.input.star.language) + 1,
            "task_user_id": $routeParams.user_id,
            "tag_group_id_list": $scope.input.tags,

        }
        toastServices.show();
        errorServices.show("....");
        flow.upload();
    };
    $scope.$on("flow::fileSuccess", function(file, message, chunk) {
        toastServices.hide();
        // errorServices.autoHide("上传成功");
        $rootScope.back();
    })
});
