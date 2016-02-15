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
        * @param {Object|String} data Initial data:
        * <pre>
        * {
        *     // Time stamp as a string (primary field).
        *     time: '01:30:00',
        *     // Flag, which is set when time is reduced below '00:00:00'.
        *     negative: false
        * }
        * </pre>
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
         * @returns {TimeStr} Current time.
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

        /**
         * @ngdoc method
         * @name short
         * @methodOf coa.datetime.class:TimeStr
         * @returns {String} The time stamp in shortened format without seconds: <code>hh:mm</code>.
         */
        TimeStr.prototype.short = function() {
            if (this.negative) {
                return this.toString().substr(0, 6);
            }
            return this.toString().substr(0, 5);
        };

        /**
         * @ngdoc method
         * @name add
         * @methodOf coa.datetime.class:TimeStr
         * @param {Number} h The number of hours to add.
         * @param {Number} m The number of minutes to add.
         * @param {Number} s The number of seconds to add.
         * @description
         * Add to this time. Negative numbers not supported.
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
         * @ngdoc method
         * @name addSeconds
         * @methodOf coa.datetime.class:TimeStr
         * @param {Number} num The number of seconds to add (or subtract if negative).
         * @description
         * Add or subtract seconds from the time. If time goes below <code>00:00:00</code>, then
         * the flag <code>negative</code> is set for this.
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
         * @ngdoc method
         * @name setNow
         * @methodOf coa.datetime.class:TimeStr
         * @description
         * Set the time to the current local time.
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
         * @ngdoc method
         * @name notYet
         * @methodOf coa.datetime.class:TimeStr
         * @param {TimeStr} time A <i>TimeStr</i> instance to compare.
         * @return {Boolean}
         * True if this time is not already as much as the given time.
         */
        TimeStr.prototype.notYet = function(time) {
            return this.time.toString() < time.toString();
        };

        /**
         * @ngdoc method
         * @name isPast
         * @methodOf coa.datetime.class:TimeStr
         * @param {TimeStr} time A <i>TimeStr</i> instance to compare.
         * @return {Boolean}
         * True if this time is already past the given time.
         */
        TimeStr.prototype.isPast = function(time) {
            return this.time.toString() > time.toString();
        };

        /**
         * @ngdoc method
         * @name isAlready
         * @methodOf coa.datetime.class:TimeStr
         * @param {TimeStr} time A <i>TimeStr</i> instance to compare.
         * @return {Boolean}
         * True if this time is at least the given time.
         */
        TimeStr.prototype.isAlready = function(time) {
            return this.time.toString() >= time.toString();
        };

        /**
         * @ngdoc method
         * @name seconds
         * @methodOf coa.datetime.class:TimeStr
         * @return {Number} This time converted to seconds.
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
        /**
         * @ngdoc method
         * @name diff
         * @methodOf coa.datetime.class:TimeStr
         * @param {TimeStr} time A <i>TimeStr</i> instance to compare.
         * @return {Number} Number of seconds left after the <i>time</i> is subtracted
         * from this.
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
