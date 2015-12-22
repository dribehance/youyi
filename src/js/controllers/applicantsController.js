// by dribehance <dribehance.kksdapp.com>
var applicantsController = function($scope, $rootScope, $route, $timeout, $routeParams, $location, $filter, walletServices, weixinServices, SharedState, myLoveServices, taskServices, errorServices, toastServices, localStorageService, config) {
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
    $scope.accept = function(applicant, e) {
        e.stopPropagation();
        if (applicant.oper_status == "1" || applicant.oper_status == "0") {
            weixinServices.prepare_pay && weixinServices.prepare_pay({
                "yy_user_id": applicant.user_id,
                "task_id": $routeParams.task_id
            });
            if ($rootScope.wx_browser) return;
            $location.path("/payment").search("state", JSON.stringify({
                "yy_user_id": applicant.user_id,
                "task_id": $routeParams.task_id
            }));
            // $window.location.href = 
            // return;
            // toastServices.show();
            // taskServices.queryPaymentInfo({
            //     "yy_user_id": applicant.user_id,
            //     "task_id": $routeParams.task_id
            // }).then(function(data) {
            //     toastServices.hide()
            //     if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            //         SharedState.turnOn("payment_panel");
            //         $scope.payment_user = data.Result.user;
            //         $scope.payment_money = data.Result.money;
            //         $scope.accept_applicant = applicant;
            //     } else {
            //         errorServices.autoHide(data.message);
            //     }
            // })
        }
    }
    $scope.unlike = function(applicant, e) {
        myLoveServices.cancel({
            "collection_id": applicant.collection_id
        }).then(function(data) {
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                applicant.is_collect = 0
            } else {
                errorServices.autoHide(data.message);
            }
        })
        e.stopPropagation();
    }
    $scope.like = function(applicant, e) {
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
        e.stopPropagation();
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
    $scope.$watch("payway.channel", function(n, o) {
        if (n) {
            $scope.payway.balance = false;
        }
    }, true)
    $scope.ajaxForm = function() {
        if ($scope.payway.balance && $scope.wallet.is_setPayPwd == "0") {
            $location.path("modify_trade_password");
            return;
        }
        if ($scope.payway.balance && $scope.wallet.is_setPayPwd == "1") {
            SharedState.turnOn("password_panel")
            return;
        }
        $scope.pay();
    };
    $scope.pay = function() {
        // default balance pay
        var pay_type = 0;
        if ($scope.payway.balance && $scope.input.password == "" || $scope.input.paying) {
            return;
        }
        if (!$scope.payway.balance && $scope.payway.channel == "yinlian") {
            pay_type = 1;
        }
        if (!$scope.payway.balance && $scope.payway.channel == "weixin") {
            pay_type = 2;
        }
        if (!$scope.payway.balance && $scope.payway.channel == "alipay") {
            pay_type = 3;
        }
        $scope.input.paying = true;
        toastServices.show();
        taskServices.pay({
            "user_id": $scope.accept_applicant.user_id,
            "task_id": $routeParams.task_id,
            "pay_type": pay_type,
            "pay_total_money": $scope.payment_money.total_money,
            "pay_password": $scope.input.password,
        }).then(function(data) {
            $scope.input.paying = false;
            toastServices.hide();
            alert(data)
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                if (!$scope.payway.balance && $scope.payway.channel == "yinlian") {
                    $scope.invokeYinlianPay(data);
                    return
                }
                if (!$scope.payway.balance && $scope.payway.channel == "weixin") {
                    alert("invoke weixin pay")
                    $scope.invokeWeixinPay(data);
                    return;
                }
                if (!$scope.payway.balance && $scope.payway.channel == "alipay") {
                    $scope.invokeAlipay(data);
                    return;
                }
                // balance pay handle
                $route.reload();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // pay by weixin
    $scope.invokeWeixinPay = function(data) {
        var weixin_res = data.weixinTemp;
        weixinServices.pay && weixinServices.pay(data);
    };
    // pay by alipay
    $scope.invokeAlipay = function(data) {
        // alipayServices.pay
        $scope.alipay = data.sParaTemp;
        toastServices.show();
        $timeout(function() {
            // toastServices.hide();
            angular.element("#alipayForm").submit();
        }, 1000)
    };
    // pay by yinlian
    $scope.invokeYinlianPay = function(data) {

    };
    // pay by balance
    $scope.invokeBalancePay = function(data) {

    };
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
