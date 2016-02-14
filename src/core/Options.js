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
                ret[names[i]] = angular.extend({}, this[names[i]]);
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
            options = options || {};

            // Validate given options.
            for(var k in options) {
                if (!this[k]) {
                    return null;
                }
                if (this[k].type instanceof Function) {
                    if (!this[k].type(options[k])) {
                        return null;
                    }
                }
                else if (typeof(options[k]) != this[k].type) {
                    return null;
                }
            }

            var ret;

            // Check for required and fill in empty options.
            var names = Object.keys(this);
            for (var i = 0; i < names.length; i++) {
                var k = names[i];
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

        return Options;
    }]);

})();
