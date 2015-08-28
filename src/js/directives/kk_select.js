// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('kkselect', function() {
    return {
        restrict: 'E',
        templateUrl:"_directive/_kkselect.html",
        scope:{
        	"kkoptions":"="
        },
        link: function(scope, element, attrs) {
            // function body
            var hood = $(element).find(".hood");
            var select = $(element).find("select");
            hood.click(function(){
            	console.log(select)
            	console.log("click")
            	select.click();
            })
        }
    };
});