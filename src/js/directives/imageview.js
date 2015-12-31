// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('imageview', function() {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        template: "<img ng-src='{{src}}' show-on-loaded>",
        link: function(scope, element, attrs) {
            // var bg_images = ["../images/random_1.jpg", "../images/random_2.jpg", "../images/random_3.jpg", "../images/random_4.jpg", "../images/random_5.jpg", "../images/random_6.jpg", "../images/random_7.jpg", "../images/random_8.jpg", "../images/random_9.jpg", "../images/random_10.jpg"];
            var bg_image = "../images/default.png"
            var rate = parseFloat(scope.$eval($(element).attr('data-rate'))) || "auto";
            var style = {
                display: "block",
                width: $(element).parent().width() || $(window).width(),
                overflow: "hidden",
                "text-align": "center",
                "background-image": "url(" + bg_image + ")",
                "background-size": "100%",
                "background-position": "center center",
                // "background-repeat":"repeat"
            }
            if (rate == 'auto') {
                style["line-height"] = ($(element).parent().width() || $(window).width()) / 2 + "px";
                style["min-height"] = ($(element).parent().width() || $(window).width()) / 2;
                $(element).find("img").css({
                    "width": "100%"
                })
            } else {
                style["line-height"] = ($(element).parent().width() || $(window).width()) / rate + "px";
                style["height"] = ($(element).parent().width() || $(window).width()) / rate;
            }
            $(element).css(style);
            $(element).parent().css({
                overflow: "hidden"
            });
        }
    };
});
