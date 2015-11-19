// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('imageview', function() {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        template: "<img ng-src='{{src}}'>",
        link: function(scope, element, attrs) {
            var rate = parseFloat(scope.$eval($(element).attr('data-rate'))) || "auto";
            var style = {
                display: "block",
                width: $(element).width() || $(window).width(),
                overflow: "hidden",
                "text-align":"center",
                "background-image": "url('../images/banner_1.png')",
                // "background-size":"100%",
                "background-position":"center center",
                "background-repeat":"repeat"
            }
            if (rate == 'auto') {
                style["line-height"] = ($(element).width() || $(window).width()) / 2 +"px";
                style["min-height"] = ($(element).width() || $(window).width()) / 2;
                $(element).find("img").css({"width":"100%"})
            }
            else {
                style["line-height"] = ($(element).width() || $(window).width()) / rate +"px";
                style["height"] = ($(element).width() || $(window).width()) / rate;
            }
            $(element).css(style);
        }
    };
});
