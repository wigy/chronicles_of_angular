(function() {

	var module = angular.module('coa.input.keyboard', []);

	/**
 	* Attach a key handler function from the scope.
 	*
 	* The given function name is called for each key-press event with the
 	* simple string argument describing the key pressed.
	*
	* Currently this function supports few basic keys.
 	* TODO: Proper documentation.
 	*/
	module.directive('coaKeyHandler', [function() {

    	return {
        	restrict: 'A',
        	link: function($scope, $elem, $attrs) {

            	$elem.bind('keypress', function(event) {

					var key = "Unknown key " + event.keyCode;

					if (event.charCode >= 65 && event.charCode <= 90 )
						key = String.fromCharCode(event.charCode);
					if (event.charCode >= 97 && event.charCode <= 122 )
						key = String.fromCharCode(event.charCode).toUpperCase();

                    var handler = $scope.$eval($attrs.coaKeyHandler);
					if (handler) {
						handler(key);
						event.preventDefault();
					}
                	else
                        d("Cannot find key-press handler", $attrs.coaKeyHandler);
            	});
        	}
    	};
	}]);

})();
