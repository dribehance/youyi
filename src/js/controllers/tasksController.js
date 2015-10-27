// by dribehance <dribehance.kksdapp.com>
var tasksController = function($scope, $location,$routeParams, taskServices, SharedState, errorServices, toastServices, localStorageService, config) {
    $scope.task_tab = {
        name: $routeParams.from == "task"?"accept":"release",
    }
    $scope.tasks = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多"
    }
    $scope.$watch("task_tab.name", function(n, o) {
        if (n === undefined || o === undefined) {
            return;
        }
        $scope.tasks = [];
        $scope.page = {
            pn: 1,
            page_size: 10,
            message: "点击加载更多"
        }
        $scope.no_more = false;
        $scope.loadMore();
    })
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        $scope.page.message = "正在加载...";
        if ($scope.task_tab.name == "release") {
            $scope.loadRelease();
        } else {
            $scope.loadAccept();
        }

    };
    // release record
    $scope.loadRelease = function() {
        toastServices.show();
        taskServices.queryTaskByRelease($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })
    };
    // accept record
    $scope.loadAccept = function() {
        toastServices.show();
        taskServices.queryTaskByAccept($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })
    };
    $scope.agree = function(task) {
        toastServices.show();
        taskServices.agree({
            "task_id": task.task_id
        }).then(function(data) {
            toastServices.hide();
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                task.oper_status = data.oper_status;
                task.status_message = data.status_message;
                SharedState.turnOff("agree_panel");
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.reject = function(task) {
        toastServices.show();
        taskServices.reject({
            "task_id": task.task_id
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                task.oper_status = data.oper_status;
                task.status_message = data.status_message;
                SharedState.turnOff("agree_panel");
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.action = function(task) {
        $scope.current_task = task;
        // comment;
        if (task.oper_status == '2') {
            var path = task.task_id + "/comment";
            $location.path(path)
            return;
        }
        // agree;
        // reject;
        if (task.oper_status == '-1') {
            SharedState.turnOn("agree_panel");
            return;
        }
        return;
    };
    // collapse
    $scope.input = {
        collapse_id:"",
    }
    $scope.toggle_collapse = function (current_id) {
        if (current_id == $scope.input.collapse_id) {
            $scope.input.collapse_id = "";
        }
        else {
            $scope.input.collapse_id = current_id
        }
    }
}
