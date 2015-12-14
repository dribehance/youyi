// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('banner', function() {
    return {
        restrict: 'E',
        transclude: true,
        template:"<div class='carousel-holder' ng-transclude></div>",
        link: function(scope, element, attrs) {
            var options = {
                autoPlay: 5000,
                singleItem: true,
                pagination: false
            }
            options = angular.extend({},options,scope.$eval($(element).attr('data-options')));
            var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
            var style = {
                display: "block",
                width: $(element).parent().width() || $(window).width(),
                height: ($(element).parent().width() || $(window).width()) / rate
            }
            $(element).css(style);
            scope.$on('repeat_done', function() {
                // carousel init
                $(element).find(".carousel-holder").owlCarousel(options);
            });
        }
    };
});
