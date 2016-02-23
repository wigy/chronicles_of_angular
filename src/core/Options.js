(function() {

    var module = angular.module('coa.core');

    var Options;

    module.factory('Options', ['Class', 'Option', function(Class, Option) {

        if (Options) {
            return Options;
        }

        /**
         * @ngdoc function
         * @name coa.core.class:Options
         * @description
         *
         * A collection of {@link coa.core.class:Option Option} instances providing
         * validation services and operations for options. The collection stores only
         * definitions and not actual option values. Option values are passed through
         * {@link coa.core.class:Options#methods_validate validation function} and stored separately.
         *
         * @param {Object} options An object defining options. For example
         * <pre>
         * {
         *    required: {
         *        text: "This value is required.",
         *        type: "boolean",
         *        default: false,
         *        required: false,
         *        op: function(option, value) {
         *            return !(option && value === null);
         *        },
         *    }
         * }
         * </pre>
         * Each named option is instantiated as an {@link coa.core.class:Option Option}
         * and stored to the collection.
         */
        Options = function(options) {
            this.init(options);
        };

        Options.prototype = new Class();
        Options.prototype.__class = 'coa.core.Options';

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.core.class:Options
         * @param {Object} data Initial data to be filled to members.
         * @description
         *
         * Instantiate each option and store to this collection.
         */
        Options.prototype.init = function(options) {
            if (options) {
                for(var k in options) {
                    this[k] = new Option(options[k]);
                }
            }
        };

        /**
         * @ngdoc method
         * @name inherit
         * @methodOf coa.core.class:Options
         * @param {Object} data Initial data to added as new options.
         * @return {Options} New option collection with additional options.
         * @description
         *
         * Create a clone of an option collection and add new options into it.
         */
        Options.prototype.inherit = function(options) {
            var names = Object.keys(this);
            var ret = new Options();
            for (var i=0; i < names.length; i++) {
                ret[names[i]] = new Option(angular.extend({}, this[names[i]]));
            }
            ret.init(options);
            return ret;
        };

        // TODO: Implement toString().

        /**
         * @ngdoc method
         * @name validate
         * @methodOf coa.core.class:Options
         * @param {Object} data Option values offered.
         * @return {Object} Validated and corrected collection of option or null if invalid.
         * @description
         *
         * This function scans through option values and validates them against this collection.
         * Missing values are added from defaults unless they are required options. If any of
         * the values is not valid, then null is returned. Note that if options are valid and
         * complete, then the original object is returned. Otherwise new object instance is created.
         */
        Options.prototype.validate = function(options) {

            var k;
            options = options || {};

            // Validate given options.
            for(k in options) {
                if (!this[k]) {
                    return null;
                }
                if (this[k].type instanceof Function) {
                    if (!this[k].type(options[k])) {
                        return null;
                    }
                }
                else if (typeof(options[k]) !== this[k].type) {
                    return null;
                }
            }

            var ret;

            // Check for required and fill in empty options.
            var names = Object.keys(this);
            for (var i = 0; i < names.length; i++) {
                k = names[i];
                if (!options[k]) {
                    if (this[k].required) {
                        return null;
                    }
                    if (!ret) {
                        ret = {};
                        angular.extend(ret, options);
                    }
                    ret[k] = this[k].default;
                }
            }

            return ret ? ret : options;
        };

        /**
         * @ngdoc method
         * @name operate
         * @methodOf coa.core.class:Options
         * @param {Options} options Options applied to the data.
         * @param {Any} args Any arguments depending on the context options are used.
         * @return {Object} Return values indexed by the names of options after operation.
         * @description
         *
         * This function assumes that options are validated. Then each operation-function is
         * called for every option defined with the additional arguments given. Return values
         * are collected into the object using an option names as keys.
         */
        Options.prototype.operate = function(options, args) {
            var ret = {};
            var opArgs = Array.prototype.splice.call(arguments, 1);
            opArgs.splice(0, 0, null);
            var names = Object.keys(this);
            for (var i = 0; i < names.length; i++) {
                opArgs[0] = options[names[i]];
                ret[names[i]] = this[names[i]].operate.apply(this[names[i]], opArgs);
            }

            return ret;
        };

        /**
         * @ngdoc method
         * @name test
         * @methodOf coa.core.class:Options
         * @param {Options} options Options applied to the data.
         * @param {Object} args Additional value to be passed to the test function.
         * @return {Array} Empty array if no tests failing. Otherwise the list of texts of all failed tests.
         * @description
         *
         * This function assumes that options are validated. Then each operation-function is
         * called for every option defined with the additional parameter <code>args</code>.
         * If the return value of the call is <code>true</code>, then it is
         * considered success. Otherwise
         * it is a failure and the <code>text</code> of the option is added to the list of failures.
         *
         * For example:
         * <pre>
         * var options = new Options({
         *   required: {
         *     text: "Value cannot be %v since option is set to %o.",
         *     op: function(option, value) {
         *         return !option || value;
         *     },
         * });
         *
         * options.test({required: true}, 0);
         * // => ['Value cannot be 0 since option is set to true.']
         * options.test({required: true}, 1);
         * // => []
         * options.test({required: false}, 0);
         * // => []
         *
         * </pre>
         *
         * It is possible to use <code>%o</code> to embed value of the option in the text. Similarly
         * <code>%v</code> in the text of the option is replaced with the value given as first additional
         * argument for this function.
         */
        Options.prototype.test = function(options, args) {
            var ret = [];
            var opArgs = Array.prototype.splice.call(arguments, 1);
            opArgs.splice(0, 0, null);
            var names = Object.keys(this);
            for (var i = 0; i < names.length; i++) {
                opArgs[0] = options[names[i]];
                if (this[names[i]].operate.apply(this[names[i]], opArgs)) {
                    continue;
                }
                ret.push(this[names[i]].text.replace(/%o/g, opArgs[0]).replace(/%v/g, opArgs[1]));
            }

            return ret;
        };

        return Options;
    }]);

})();
