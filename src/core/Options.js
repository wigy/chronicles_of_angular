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
         * validation services for options.
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

        return Options;
    }]);

})();
