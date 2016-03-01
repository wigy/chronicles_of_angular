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
 * Show all arguments on the console with stack trace.
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
        if (args[i] instanceof Object && !args[i].__class) {
            msg += JSON.stringify(args[i]);
        } else {
            msg += args[i];
        }
    }
    d.messages.push(msg);
    if (!d.silenced) {
        var err = new Error('Stack trace');
        var stack = err.stack.split("\n");
        stack.splice(0,2);
        if (d.stack) {
            console.log.apply(console, args);
            for (var j = 0; j < stack.length; j++) {
                console.log('%c' + stack[j], 'color: red; display: none')
            }
        } else {
            var line = /\((.*)\)/.exec(stack[0]);
            if (line) {
                console.log('%c' + line[1], 'color: red');
            } else {
                console.log('%c' + stack[0], 'color: red');
            }
            console.log.apply(console, args);
        }
    }
    return args[args.length - 1];
}

// If set, do not show messages.
d.silenced = false;
// If set, show full stack trace on call to d().
d.stack = false;
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
