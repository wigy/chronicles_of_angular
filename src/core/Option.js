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
        Option.prototype.__class = 'coa.core.Option';

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

        /**
         * @ngdoc method
         * @name operate
         * @methodOf coa.core.class:Option
         * @param {Any} option Value set for this option in the context.
         * @param {Any} args Any arguments depending on the context.
         * @return {Any} Return value of the operation function defined for this option.
         * @description
         *
         * This function checks that option value is not undefined in which case warning
         * is given and undefined returned. Otherwise the operation function defined for
         * this option is called and its return value returned.
         */
        Option.prototype.operate = function(option, args) {
            if (option === undefined) {
                d("Undefined value given for Option.operate() option", this);
                return undefined;
            }
            args = Array.prototype.slice.call(arguments);
            return this.op.apply(this, args);
        };

        return Option;
    }]);

})();
