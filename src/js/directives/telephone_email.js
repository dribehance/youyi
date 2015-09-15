// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").directive('telephoneOrEmail', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(telephoneOrEmail);
            function telephoneOrEmail(viewValue) {
            	var reg = {
            		telephone:/(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
            		email:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            	}
                if (ctrl.$isEmpty(viewValue)) {
                    ctrl.$setValidity('telephoneOrEmail', true);
                    return viewValue;
                }
                if (reg.telephone.test(viewValue) || reg.email.test(viewValue)) {
                    ctrl.$setValidity('telephoneOrEmail', true);
                } else {
                    ctrl.$setValidity('telephoneOrEmail', false);
                }
                return viewValue;
            }
        }
    };
});
