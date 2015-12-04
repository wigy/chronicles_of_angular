(function() {

    var module = angular.module('coa.data');

    module.factory('Type', ['Class', function(Class) {

        /**
         * Type description to be used as a prototype for any data container class.
         * @class data.Type
         * @memberof data
         * @extends core.Class
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
