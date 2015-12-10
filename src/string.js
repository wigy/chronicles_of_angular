/**
 * @ngdoc overview
 * @name String
 * @description
 *
 * Utility functions for built-in class <i>String</i>.
 */

/**
 * @ngdoc function
 * @name String.function:ucfirst
 * @description
 *
 * Convert first letter upper-case.
 * <pre>
 * "name of something".ucfirst()
 * => "Name of something"
 * </pre>
 */
Object.defineProperty(String.prototype, 'ucfirst', {value: function(value) {
    var str = this.toString();
    if (str.length) {
        str = str[0].toUpperCase() + str.substr(1);
    }
    return str;
}});

/**
 * @ngdoc function
 * @name String.function:code2human
 * @description
 *
 * Convert lower-case underscore-separated word to capitalized words separated with spaces.
 * <pre>
 * "this_is_code".code2human()
 * => "This Is Code"
 * </pre>
 */
Object.defineProperty(String.prototype, 'code2human', {value: function(value) {
    var parts = this.split('_');
    return parts.map(function(str){return str.ucfirst();}).join(" ");
}});
