/**
 * Dump all arguments to the console.
 *
 * @param arg1 {any} Any number of arguments can be given.
 * @param ...
 * @param argN {any}
 * @return The last argument <i>argN</i>.
 */
function d(arg1, arg2, argN) {

    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
        return;
    }
    console.log.apply(console, args);
    return args[args.length - 1];
}

/**
 * Tools for playing audio files.
 *
 * @module audio
 */
angular.module('coa.audio', []);

/**
 * Data containers and utilities needed for user management and authentication handling.
 *
 * @module auth
 */
angular.module('coa.auth', ['coa.data']);

/**
 * Core classes needed by all other <i>CoA</i> modules.
 *
 * @module core
 */
angular.module('coa.core', []);

/**
 * Classes needed for storing and presenting data and its meta information-
 *
 * @module data
 * @requires module:core
 */
angular.module('coa.data', ['coa.core']);

/**
 * Input device handling helpers.
 *
 * @module input
 */
angular.module('coa.input', []);

(function() {

    var module = angular.module('coa.audio');

    // Audio files loaded as object with audio names as keys and `Audio` instances
    // as values.
    var audio = {};

    /**
     * Load sound files.
     */
    function load(mapping) {
        angular.forEach(mapping, function(v, k) {audio[k] = new Audio(v);});
    }

    function play(name, timestamp) {
        if (name === 'list') {
            return Object.keys(audio);
        }
        if (!(name in audio)) {
            d("Invalid audio name:", name);
            return;
        }

        if (typeof(DEBUG) !== "undefined" && DEBUG) {
            d((timestamp ? timestamp : '') + "   >>> " + name + " <<<");
        } else {
            audio[name].play();
        }
    }

    /**
     * Service to play sounds.
     */
    module.service('coaPlayer', [function() {
        return {
            load: load,
            play: play,
        };
    }]);

})();

(function() {

    var module = angular.module('coa.auth');

    module.factory('User', ['Type', function(Type) {

        function User(data) {
            // Name of the user.
            this.name = null;

            this.init(data);
        }

        User.prototype = new Type({'name' : {}});

        return User;
    }]);

})();

(function() {

    var module = angular.module('coa.core');

    module.factory('Class', [function() {

        /**
         * @memberof module:core
         * @classdesc Base class for all other classes in <i>CoA</i>.
         *
         * @constructs Class
         */
        function Class() {
        }

        Class.prototype = {};

        return Class;
    }]);

})();

(function() {

    var module = angular.module('coa.data');

    module.factory('Type', ['Class', function(Class) {

        /**
         * @memberof module:data
         * @classdesc Type description to be used as a prototype for any data container class.
         * @extends module:core.Class
         *
         * @constructs Type
         * @param  {Object} definition Definition of each member of the data object.
         */
        function Type(definition) {
        }

        Type.prototype = new Class();

        Type.prototype.init = function(data) {
            d(data);
        };

        return Type;
    }]);

})();

(function() {

    var module = angular.module('coa.input');

    /**
     * Attach a key handler function from the scope.
     *
     * The given function name is called for each key-press event with the
     * simple string argument describing the key pressed.
     *
     * Currently this function supports few basic keys, which are returned
     * as the following strings:
     *
     * 'Space'
     * 'A' - 'Z'
     * '0' - '9'
     * '!' - '/'
     */
    module.directive('coaKeyHandler', [function() {

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
