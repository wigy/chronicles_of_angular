(function() {

    var module = angular.module('coa.core');

    var Option;

    module.factory('Option', ['Class', function(Class) {

        if (Option) {
            return Option;
        }

        /**
         * @ngdoc function
         * @name coa.core.class:Option
         * @description
         *
         * A description of general purpose option containing constraints
         * for allowed values and operational functions implementing an
         * option in the context they are used.
         *
         * A collection of these is an {@link coa.core.class:Options Options}
         * instance.
         * @param {Object} definitions An object descriping this option.
         * <pre>
         *  {
         *       text: "This value is required.",
         *       type: "boolean",
         *       default: false,
         *       required: false,
         *       op: function(option, value) {
         *           return !(option && value === null);
         *       }
         *  }
         * </pre>
         * The <b>text</b> describes the option, <b>type</b> is either type as a
         * string or validation function for valid option values, <b>default</b>
         * is default value for the option, <b>required</b> is a flag telling that
         * the option has to be always defined and <b>op</b> is a function implementing
         * the option in the context where it is used. The function gets the value
         * of the option as the first parameter and other parameters depends on the
         * context, where the option collection is used.
        */
        Option = function(definitions) {
            this.init(definitions);
        };

        Option.prototype = new Class();

        /**
         * @ngdoc method
         * @name init
         * @methodOf coa.core.class:Option
         * @param {Object} definitions Initial data.
         * @description
         *
         * Initialize this option with the given data.
         */
        Option.prototype.init = function(definitions) {
            definitions = definitions || {};
            this.text = definitions.text === undefined ? null : definitions.text;
            this.type = definitions.type === undefined ?  function() {return true;} : definitions.type;
            this.default = definitions.default === undefined ?  null : definitions.default;
            this.required = definitions.required === undefined ?  false : definitions.required;
            this.op = definitions.op === undefined ?  function(){return null;} : definitions.op;
        };

        return Option;
    }]);


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
         *        required: {
         *            text: "This value is required.",
         *            type: "boolean",
         *            default: false,
         *            required: false,
         *            op: function(option, value) {
         *                return !(option && value === null);
         *            },
         *        }
         * }
         * </pre>
         * Each named option is instantiated as an {@link coa.core.class:Option Option}
         * and stored to the collection.
         */
        Options = function(options) {
            this.init(options);
        };

        Options.prototype = new Class();

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
                if (opArgs[0] === undefined) {
                    d("Undefined value in", options, "given for Options.operate() option '" + names[i] + "' in", this);
                    ret[names[i]] = undefined;
                    continue;
                }
                ret[names[i]] = this[names[i]].op.apply(this[names[i]], opArgs);
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
         * <code>%v</code> in the text of the option is replaced with the value given in additional
         * argument for this function.
         */
        Options.prototype.test = function(options, args) {
            var ret = [];
            var opArgs = Array.prototype.splice.call(arguments, 1);
            opArgs.splice(0, 0, null);
            var names = Object.keys(this);
            for (var i = 0; i < names.length; i++) {
                opArgs[0] = options[names[i]];
                if (opArgs[0] === undefined) {
                    d("Undefined value in", options, "given for Options.test() option '" + names[i] + "' in", this);
                    ret[names[i]] = undefined;
                    continue;
                }
                if (this[names[i]].op.apply(this[names[i]], opArgs)) {
                    continue;
                }
                ret.push(this[names[i]].text.replace(/%o/g, opArgs[0]).replace(/%v/g, args));
            }

            return ret;
        };

        return Options;
    }]);

})();
