// by dribehance <dribehance.kksdapp.com>
var nativeController = function($scope, $window, errorServices, toastServices, localStorageService, config) {
    // ios javascript cord invoke
    // $window.connectWebViewJavascriptBridge = function(callback) {
    //     if ($window.WebViewJavascriptBridge) {
    //         callback(WebViewJavascriptBridge)
    //     } else {
    //         document.addEventListener('WebViewJavascriptBridgeReady', function() {
    //             callback(WebViewJavascriptBridge)
    //         }, false)
    //     }
    // }
    // $scope.invokeOC = function() {
    //     alert("before invokeOC")
    //     $window.connectWebViewJavascriptBridge(function(bridge) {
    //         bridge.callHandler("invokeOC", {}, function(data) {
    //          alert(data)
    //         });
    //     });
    // }
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }

    connectWebViewJavascriptBridge(function(bridge) {

        /* Init your app here */

        bridge.init(function(message, responseCallback) {
            alert('Received message: ' + message)
            if (responseCallback) {
                responseCallback("Right back atcha")
            }
        })

        bridge.registerHandler("showAlert", function(data) {
            alert(data)
        })
        bridge.registerHandler("getCurrentPageUrl", function(data, responseCallback) {
            alert('getCurrentPageUrl')
            responseCallback(document.location.toString())
        })

        bridge.callHandler("invokeOC", {}, function(data) {
            alert(data)
        });
        alert("send brefore")
        bridge.send('Hello from the javascript')
        bridge.send('Please respond to this', function responseCallback(responseData) {

            alert("Javascript got its response", responseData)


        })
    })
}
