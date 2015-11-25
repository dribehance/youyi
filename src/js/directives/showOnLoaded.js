// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('showOnLoaded', function() {
    return {
        link: function(scope, element, attrs) {
        	$(element).css({"visibility":"hidden"})
            element.bind('load', function() {
            	console.log("loaded")
                $(element).css({"visibility":"visible"})
            });
        }
    }
});
