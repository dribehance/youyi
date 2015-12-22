// by dribehance <dribehance.kksdapp.com>
var tasksController = function($scope, $location, $routeParams, taskServices, SharedState, errorServices, toastServices, localStorageService, config) {
    // change state through from,mainly after apply task;
    $scope.tasks = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "Load More",
        task_tab: {
            name: ($routeParams.from == "task" || (localStorageService.get("cache") && localStorageService.get("cache").tasks_clean && localStorageService.get("cache").tasks_clean.page.task_tab.name)) ? "accept" : "release",
        }
    }
    $scope.$watch("page.task_tab.name", function(n, o) {
        if (n === undefined ||  o === undefined || n == "") {
            return;
        }
        $scope.tasks = [];
        $scope.page = angular.extend({}, $scope.page, {
            pn: 1,
            page_size: 10,
            message: "Load More",
        })
        $scope.page.no_more = false;
        if (localStorageService.get("cache") && localStorageService.get("cache").tasks_clean) {
            $scope.tasks = localStorageService.get("cache").tasks_clean.content;
            $scope.page = localStorageService.get("cache").tasks_clean.page;
            angular.element("#scrollable-content").animate({
                scrollTop: localStorageService.get("cache").tasks_clean.scroll_hood
            })
            localStorageService.set("cache", {
                tasks_clean: null
            })
        } else {
            $scope.loadMore();
        }
    })
    $scope.routeTo = function(current_id) {
        // cache
        $scope.cache_tasks();
        // tell task diff wehter a task accept from index or tasks 
        $location.path("tasks/" + current_id).search("from", "tasks");
    }
    $scope.routeToApplicants = function(current_id) {
        // cache
        $scope.cache_tasks();
        // tell task diff wehter a task accept from index or tasks 
        $location.path(current_id + "/applicants").search("from", null);
    }
    $scope.cache_tasks = function() {
        var cache_data = {
            content: $scope.tasks,
            page: $scope.page,
            scroll_hood: angular.element("#scrollable-content").scrollTop()
        }
        localStorageService.set("cache", {
            tasks_clean: cache_data
        });
    }
    $scope.loadMore = function() {
        if ($scope.page.no_more) {
            return;
        }
        $scope.page.message = "Loading";
        if ($scope.page.task_tab.name == "release") {
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
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.page.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.page.no_more) {
                $scope.page.message = "No More";
            }
            $scope.page.pn++;
        })
    };
    // accept record
    $scope.loadAccept = function() {
        toastServices.show();
        taskServices.queryTaskByAccept($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.tasks = $scope.tasks.concat(data.Result.tasks.list);
                $scope.page.no_more = $scope.tasks.length == data.Result.tasks.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.page.no_more) {
                $scope.page.message = "No More";
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
        if (task.oper_status == '8') {
            var path = task.task_id + "/comment";
            $location.path(path).search("user_id", task.request_users[0].user_id)
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
}
