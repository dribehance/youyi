// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('imageview', function() {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        template: "<img ng-src='{{src}}'>",
        link: function(scope, element, attrs) {
            var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
            var style = {
                display: "block",
                width: $(element).width() || $(window).width(),
                height: ($(element).width() || $(window).width()) / rate,
                overflow: "hidden",
                "text-align":"center",
                "line-height":($(element).width() || $(window).width()) / rate +"px",
                "background-image": "url('../images/banner_1.png')",
                "background-size":"100%",
                "background-position":"center center",
                "background-repeat":"no-repeat"
            }
            $(element).css(style);
        }
    };
});
