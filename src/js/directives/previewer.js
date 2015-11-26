// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('previewer', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var options = {
                autoPlay: 5000,
                stopOnHover: true,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true
            };
            var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
            var style = {
                width:$(element).width() || $(window).width(),
                // height:($(element).width() || $(window).width())/rate,
                // "line-height": ($(element).width() || $(window).width())/rate +"px",
                overflow:"hidden",
                "text-align":"center",
                // "background-image":"url('../images/banner.png')",
                // "background-repeat":"no-repeat",
                // "background-position":"center center",
                // "background-size":"100%"
            }
            options = angular.extend({},options,scope.$eval($(element).attr('data-options')));
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
            scope.$on('repeat_done', function() {
                // $(element).find(".image-holder").css(style)
                // carousel init
                $(element).owlCarousel(options);
            });
        }
    };
});
r
