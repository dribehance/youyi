// by dribehance <dribehance.kksdapp.com>
var applicantsController = function($scope, $route, $routeParams, $location, $filter, walletServices, weixinServices, SharedState, myLoveServices, taskServices, errorServices, toastServices, localStorageService, config) {
    $scope.applicants = [];
    $scope.input = {
        password: "",
        error_message: "",
        paying: false,
    };
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "Load More",
        task_id: $routeParams.task_id
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "Loading";
        taskServices.queryApplicantsByTask($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "Load More";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.applicants = $scope.applicants.concat(data.RequestList.list);
                // $scope.payment = data.money;
                $scope.no_more = $scope.applicants.length == data.RequestList.totalRow ? true : false;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "No More";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    // accept applicant
    $scope.accept = function(applicant) {
        if (applicant.oper_status == "1" || applicant.oper_status == "0") {
            toastServices.show();
            taskServices.queryPaymentInfo({
                "yy_user_id": applicant.user_id,
                "task_id": $routeParams.task_id
            }).then(function(data) {
                toastServices.hide()
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    SharedState.turnOn("payment_panel");
                    $scope.payment_user = data.Result.user;
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
    // preview translator
    $scope.preview_translator = function(translator_id) {
        $location.path("translators/" + translator_id).search("to", "preview")
    };
    // payway balance or third part payment
    $scope.payway = {
        balance: true,
        channel: "",
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
        $scope.input.paying = true;
        $scope.input.error_message = '';
        toastServices.show();
        taskServices.pay({
                "user_id": $scope.accept_applicant.user_id,
                "task_id": $routeParams.task_id,
                "pay_type": "2",
                "pay_total_money": $scope.payment_money.total_money,
                "pay_password": $scope.input.password,
            }).then(function(data) {
                toastServices.hide();
                $scope.input.paying = false;
                if (data.code == config.request.SUCCESS) {
                    console.log(data)
                    weixinServices.pay(data);
                    // weixinServices.pay()
                    // $route.reload();
                } else {
                    $scope.input.error_message = data.message;
                    // errorServices.autoHide(data.message);
                }
            })
            // $scope.thirdpart();
    }
    $scope.pay = function() {
        if ($scope.input.password == "" || $scope.input.paying) {
            return;
        }
        // 余额支付;
        $scope.input.paying = true;
        $scope.input.error_message = '';
        toastServices.show();
        taskServices.pay({
            "user_id": $scope.accept_applicant.user_id,
            "task_id": $routeParams.task_id,
            "pay_type": "0",
            "pay_total_money": $scope.payment_money.total_money,
            "pay_password": $scope.input.password,
        }).then(function(data) {
            toastServices.hide();
            $scope.input.paying = false;
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $route.reload();
            } else {
                $scope.input.error_message = data.message;
                // errorServices.autoHide(data.message);
            }
        })
    };
    // password control
    // password control
    $scope.imulate_password = [];
    $scope.prepare_imulate_password = function() {
        $scope.imulate_password = new Array($scope.input.password.length);
    };
    $scope.$watch("input.password", function(n, o) {
        if (n === undefined) return;
        $scope.prepare_imulate_password();
        if ($scope.input.password.length == 6) {
            $scope.pay();
        }
        if ($scope.input.password.length > 6) {
            $scope.input.password = $filter("limitTo")($scope.input.password, 6)
        }
    });
    // get wallet;
    walletServices.query().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.wallet = data.MyMoneyResponse;
        } else {
            errorServices.autoHide(data.message);
        }
    })
}
