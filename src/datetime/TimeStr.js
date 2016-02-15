(function() {

    var module = angular.module('coa.datetime');

    var TimeStr;

    module.factory('TimeStr', ['Data', 'TypeStr', 'TypeBool', function(Data, TypeStr, TypeBool) {

        if (TimeStr) {
            return TimeStr;
        }

        /**
        * @ngdoc function
        * @name coa.datetime.class:TimeStr
        * @description
        *
        * A class describing a time stamp string of form <tt>HH:MM:SS</tt>.
        * Seconds can be added and subtrackted from the time. If it goes
        * negative, a minus sign is added as prefix.
        */
        TimeStr = function(data) {
            this.init(data);
        };

        /**
         * @ngdoc method
         * @name now
         * @methodOf coa.datetime.class:TimeStr
         * @preturns {TimeStr} Current time.
         * @description
         *
         * A static method to return current time, for example
         * <pre>
         *   var now = TimeStr.now():
         * </pre>
         */
        TimeStr.now = function() {
            var clock = new TimeStr();
            clock.setNow();
            return clock;
        };

        TimeStr.prototype = new Data('coa.datetime.Time', [
            {time: {type: TypeStr, default: '00:00:00', options: {pattern: /^\d\d:\d\d:\d\d$/}}},
            {negative: {type: TypeBool, default: false}}
            // TODO: Add support for 'overflow' boolean as well.
        ], {primary_field: 'time'});

        TimeStr.prototype.toString = function() {
            return this.negative ? '-' + this.time : this.time;
        };

        // TODO: Proper docs for all functions.
        /**
         * Value as <tt>HH:MM</tt>.
         */
        TimeStr.prototype.short = function() {
            if (this.negative) {
                return this.toString().substr(0, 6);
            }
            return this.toString().substr(0, 5);
        };

        /**
         * Add to this time.
         */
        TimeStr.prototype.add = function(h, m, s) {
            var parts = this.time.split(':');
            s = s + parseInt(parts[2]);
            m += Math.floor(s/60);
            s = s % 60;
            m = m + parseInt(parts[1]);
            h += Math.floor(m/60);
            m = m % 60;
            h = h + parseInt(parts[0]);
            h = h % 24;

            this.time = ('0' + h).substr(-2,2) + ':' + ('0' + m).substr(-2,2) + ':' + ('0' + s).substr(-2,2);
        };

        /**
         * Add or subtract seconds.
         */
        TimeStr.prototype.addSeconds = function(num) {
            if (num > 0) {
                this.add(0, 0, num);
            }
            else {
                var zero = new TimeStr('00:00:00');
                var add = this.seconds() + num;
                if (add < 0) {
                    zero.addSeconds(-add);
                    this.time = zero.time;
                    this.negative = true;
                } else {
                    zero.addSeconds(add);
                    this.time = zero.time;
                }
            }
        };

        /**
         * Set the time to the current time.
         */
        TimeStr.prototype.setNow = function() {
            this.time = (new Date()).toJSON().substr(11, 8);
            var hours = (-(new Date()).getTimezoneOffset() / 60);
            if (hours > 0) {
                this.add(hours, 0, 0);
            }
            if (hours < 0) {
                this.add(24 + hours, 0, 0);
            }
        };

        /**
         * Check if this time is not already as much as the given time.
         */
        TimeStr.prototype.notYet = function(time) {
            return this.time.toString() < time.toString();
        };

        /**
         * Check if this time is already past the given time.
         */
        TimeStr.prototype.isPast = function(time) {
            return this.time.toString() > time.toString();
        };

        /**
         * Check if this time is at least the given time.
         */
        TimeStr.prototype.isAlready = function(time) {
            return this.time.toString() >= time.toString();
        };

        /**
         * Convert time to seconds.
         */
        TimeStr.prototype.seconds = function() {
            var h, m, s;
            var parts = this.time.split(':');
            h = parseInt(parts[0]);
            m = parseInt(parts[1]);
            s = parseInt(parts[2]);
            return h*60*60 + m*60 + s;
        };

        /**
         * Subtract another time from this time and return new time instance.
         */
        TimeStr.prototype.diff = function(time) {
            var a = this.seconds(), b = time.seconds();
            var ret = new Time();

            if (a < b) {
                ret.add(0, 0, b-a);
                ret.negative = true;
            } else {
                ret.add(0, 0, a-b);
            }

            return ret;
        };

        return TimeStr;
    }]);

})();
