(function() {

	'use strict';

	var module = angular.module('coa.input.keyboard', []);

	/**
 	* Attach a key handler function from the scope.
 	*
 	* The given function name is called for each key-press event with the
 	* simple string argument describing the key pressed.
 	* TODO: Proper documentation.
 	*/
	module.directive('keyHandler', [function() {

    	return {
        	restrict: 'A',
        	link: function($scope, $elem, $attrs) {

            	$elem.bind('keypress', function(event) {

					var key = event.key;
                	if (key.length == 1)
                    	key = key.toUpperCase();
                	else if (event.shiftKey)
                    	key = "Shift+" + key;
                	if (event.altKey)
                    	key = "Alt+" + key;
                	if (event.ctrlKey)
                    	key = "Control+" + key;

                	var handler = $scope.$eval($attrs.keyHandler);
                	if (handler)
                    	handler(key);
                	else
                    	d("Cannot find key-press handler", $attrs.keyHandler);
            	});
        	}
    	};
	}]);

})();
