/**
 * @ngdoc overview
 * @name globals
 * @description
 *
 * All functions and constants defined in this module are available in every module without dependency injection.
 */

/**
 * @ngdoc function
 * @name globals.function:d
 * @description
 *
 * Show all arguments on the console.
 * <pre>
 * d("Cannot find", name, "from the target", obj);
 * </pre>
 *
 * @param {any} arg1 First argument.
 * @param {any} ... ...
 * @param {any} argN Last argument.
 */
function d(arg1, arg2, argN) {

    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
        return;
    }
    var msg = '';
    for (var i = 0; i < args.length; i++) {
        if (i) {
            msg += ' ';
        }
        msg += args[i];
    }
    d.messages.push(msg);
    if (!d.silenced) {
        console.log.apply(console, args);
    }
    return args[args.length - 1];
}

// If set, do not show messages.
d.silenced = false;
// Messages recorded by d().
d.messages = [];

/**
 * A test helper to silence messaging and clear the message collection.
 */
d.quiet = function() {
    d.messages = [];
    d.silenced = true;
};

/**
 * This function helps in testing to detect if there are messages after an operation.
 * Every call to this funciton also cleans up the error list and re-enables message displaying.
 */
d.errors = function() {
    var ret = d.messages;
    d.messages = [];
    d.silenced = false;
    return ret;
};
