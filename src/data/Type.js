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
            // Need to define how data is specified and implement with documentation.
            d(data);
        };

        return Type;
    }]);

})();
