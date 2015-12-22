// by dribehance <dribehance.kksdapp.com>
var paymentController = function($scope, $rootScope, $routeParams, $location, $timeout, weixinServices, SharedState, walletServices, taskServices, errorServices, toastServices, localStorageService, config) {
    // alert($location.absUrl())
    // alert($routeParams.code + "=code");
    $scope.input = {
        password: "",
        error_message: "",
        paying: false,
    };
    toastServices.show();
    taskServices.queryPaymentInfo({
            "yy_user_id": JSON.parse($routeParams.state).yy_user_id,
            "task_id": JSON.parse($routeParams.state).task_id,
            "code": $routeParams.code
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                // SharedState.turnOn("payment_panel");
                // alert(JSON.stringify(data))
                $scope.payment_user = data.Result.user;
                $scope.payment_money = data.Result.money;
                // $scope.accept_applicant = applicant;
            } else {
                errorServices.autoHide(data.message);
            }
        })
        // payway balance or third part payment
    $scope.payway = {
        balance: false,
        channel: "yinlian",
    };
    $scope.togglePayway = function() {
        $scope.payway.balance = !$scope.payway.balance;
        if ($scope.payway.balance && $scope.wallet.is_setPayPwd == '0') {
            SharedState.turnOn("tips_panel");
        }
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
            $scope.yinlian = {
                token: localStorageService.get("token"),
                language_app: localStorageService.get("language"),
                user_id: JSON.parse($routeParams.state).yy_user_id,
                task_id: JSON.parse($routeParams.state).task_id,
                pay_type: pay_type,
                pay_total_money: $scope.payment_money.total_money
            };
            toastServices.show();
            $timeout(function() {
                // toastServices.hide();
                angular.element("#yinlianForm").submit();
            }, 1000)
            return;
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
            // "user_id": $scope.accept_applicant.user_id,
            "user_id": JSON.parse($routeParams.state).yy_user_id,
            // "task_id": $routeParams.task_id,
            "task_id": JSON.parse($routeParams.state).task_id,
            "pay_type": pay_type,
            "pay_total_money": $scope.payment_money.total_money,
            "pay_password": $scope.input.password,
            "code": $routeParams.code,
            // "timestamp":$rootScope.timestamp,
            // "nonceStr":$rootScope.nonceStr
        }).then(function(data) {
            $scope.input.paying = false;
            toastServices.hide();
            // alert(JSON.stringify(data))
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                if (!$scope.payway.balance && $scope.payway.channel == "yinlian") {
                    $scope.invokeYinlianPay(data);
                    return
                }
                if (!$scope.payway.balance && $scope.payway.channel == "weixin") {
                    // alert("invoke weixin pay")
                    $scope.invokeWeixinPay(data);
                    return;
                }
                if (!$scope.payway.balance && $scope.payway.channel == "alipay") {
                    $scope.invokeAlipay(data);
                    return;
                }
                // balance pay handle
                // $route.reload();
                toastServices.show();
                errorServices.autoHide("支付成功")
                $timeout(function() {
                    toastServices.hide();
                    $location.path("tasks").replace();
                }, 1000);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // pay by weixin
    $scope.invokeWeixinPay = function(data) {
        var weixin_res = data.weixinTemp;
        weixinServices.pay && weixinServices.pay(weixin_res);
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
    });
    // quit
    $scope.quit = function() {
        SharedState.turnOff("tips_panel");
        $scope.payway.balance = false;
    };
    $scope.setTradePassword = function() {
        $location.path("modify_trade_password");
    }
}
