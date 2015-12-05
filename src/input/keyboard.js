(function() {

    var module = angular.module('coa.input');

    /**
     * @ngdoc service
     * @name coa.input.directive:keyHandler
     * @description
     *
     * This directive sets up a keyboard handler.
     *
     * The given function name is called for each key-press event with the
     * simple string argument describing the key pressed.
     *
     * Currently this function supports few basic keys, which are returned
     * as the following strings:
     *
     * <ul>
     *  <li>'Space'
     *  <li>'A' - 'Z'
     *  <li>'0' - '9'
     *  <li>'!' - '/'
     * </ul>
     *
     * @example
     * In the template one can define the key handler function:
     * <pre>
     * &lt;body coa-key-handler="keyHandler">
     * &lt;/body>
     * </pre>
     * In the scope we provide a function <i>keyHandler</i> to react key pressing.
     * <pre>
     * $scope.keyHandler = function(key) {
     *    if (key === '!') {
     *       // Handle it
     *    }
     * }
     * </pre>
     */
    module.directive('keyHandler', [function() {

        var map = {
            32: 'Space',
        };

        return {
            restrict: 'A',
            link: function($scope, $elem, $attrs) {

                $elem.bind('keypress', function(event) {

                    var key = "Unknown key " + event.keyCode;

                    if (event.charCode >= 65 && event.charCode <= 90 ) {
                        // A - Z
                        key = String.fromCharCode(event.charCode);
                    } else if (event.charCode >= 97 && event.charCode <= 122 ) {
                        // a - z
                        key = String.fromCharCode(event.charCode).toUpperCase();
                    } else if (event.charCode >= 33 && event.charCode <= 47 ) {
                        // ! - .
                        key = String.fromCharCode(event.charCode);
                    } else if (event.charCode >= 48 && event.charCode <= 57 ) {
                        // 0 - 9
                        key = String.fromCharCode(event.charCode);
                    } else if (event.charCode in map) {
                        key = map[event.charCode];
                    }

                    var handler = $scope.$eval($attrs.coaKeyHandler);
                    if (handler) {
                        $scope.$apply(function() {
                            handler(key);
                        });
                    }
                    else {
                        d("Cannot find key-press handler", $attrs.coaKeyHandler);
                    }
                });
            }
        };
    }]);

})();
