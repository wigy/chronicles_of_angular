(function() {

    var module = angular.module('coa.datetime');

    var TimeStr;

    module.factory('TimeStr', ['Data', 'TypeStr', function(Data, TypeStr) {

        if (TimeStr) {
            return TimeStr;
        }

        /**
        * @ngdoc function
        * @name coa.auth.class:User
        * @description
        *
        * A class describing a time stamp string of form <tt>HH:MM:SS</tt>.
        */
        TimeStr = function(data) {
            this.init(data);
        };

        TimeStr.prototype = new Data('Time', 'coa.datetime', [
            {time: {type: TypeStr}}
            // TODO: Add boolean flag 'negative'.
        ]);

        // TODO: Implement as in time2xercise.

        return TimeStr;
    }]);

})();
