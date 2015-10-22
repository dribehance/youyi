// by dribehance <dribehance.kksdapp.com>
var applicantsController = function($scope, $route, $routeParams, SharedState, myLoveServices, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.applicants = [];
    $scope.input = {
        password:"",
        error_message:"",
    };
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多",
        task_id: $routeParams.task_id
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        taskServices.queryApplicantsByTask($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.applicants = $scope.applicants.concat(data.RequestList.list);
                // $scope.payment = data.money;
                $scope.no_more = $scope.applicants.length == data.RequestList.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    // accept applicant
    $scope.accept = function(applicant) {
        if ((applicant.request_type == '0' && applicant.status == '0') || (applicant.request_type == '1' && applicant.status == '1')) {
            toastServices.show();
            taskServices.queryPaymentInfo({
                "yy_user_id": applicant.user_id,
                "task_id": $routeParams.task_id
            }).then(function(data) {
                toastServices.hide()
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    SharedState.turnOn("payment_panel");
                    $scope.payment = data.Result.user;
                    $scope.payment_money = data.Result.money;
                    $scope.accept_applicant = applicant;
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        }

    }
    $scope.unlike = function(applicant) {
        myLoveServices.cancel({
            "collection_id": applicant.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                applicant.is_collect = 0
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.like = function(applicant) {
        myLoveServices.like({
            "collection_user_id": applicant.user_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                applicant.is_collect = 1,
                    applicant.collection_id = data.collection_id;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // payway balance or third part payment
    $scope.payway = {
        balance: true,
    };
    $scope.togglePayway = function() {
        $scope.payway.balance = !$scope.payway.balance;
    }
    $scope.ajaxForm = function() {
        if ($scope.payway.balance) {
            SharedState.turnOn("password_panel")
            return;
        }
        $scope.thirdpart()
    }
    $scope.thirdpart = function() {
        // $scope.thirdpart();
    }
    $scope.pay = function() {
        // 余额支付;
        $scope.input.error_message = '';
        toastServices.show();
        taskServices.pay({
            "user_id": $scope.accept_applicant.user_id,
            "task_id": $routeParams.task_id,
            "pay_type": "0",
            "pay_total_money": $scope.payment_money.total_money,
            "pay_password": $scope.input.password,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $route.reload();
            } else {
                $scope.input.error_message = data.message;
                // errorServices.autoHide(data.message);
            }
        })
    }
}
