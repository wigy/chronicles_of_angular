/**
 * @ngdoc overview
 * @name globals
 * @description
 *
 * All functions and constants defined in this module are available in every module without dependency injection.
 */

// TODO: This could be generic module in chronicles_of_grunt or even own project.

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

    // Take the args.
    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
        return;
    }

    // Get an idea about environment.
    var hasNode = true;
    try {
        module.id;
    } catch(e)  {
        hasNode = false;
    }
    var useColor = !hasNode;
    var hasBrowser = !hasNode;

    // Helper to do the logging.
    function consoleLog(args) {
        if (hasBrowser) {
            console.log.apply(console, args);
        } else {
            console.log(tomsg.apply(this, args))
        }
    }

    // Helper to show message.
    function show(msg) {
        if (useColor) {
            console.log('%c' + msg, 'color: red; display: none');
        } else {
            console.log(msg);
        }
    }

    // Scan the stack and print calling spot. Then display arguments.
    if (!d.silenced) {
        var err = new Error('Stack trace');
        var stack = err.stack.split("\n");
        stack.splice(0,2);
        if (d.stack) {
            consoleLog(args);
            for (var j = 0; j < stack.length; j++) {
                show(stack[j]);
            }
        } else {
            var line = /\((.*)\)/.exec(stack[0]);
            if (line) {
                show(line[1]);
            } else {
                line = /^\s+at\s+(.*)/.exec(stack[0]);
                if (line) {
                    show(line[1]);
                } else {
                    show(stack[0]);
                }
            }
            consoleLog(args);
        }
    }

    // Convert to string and record the message.
    function tomsg(arg) {
        var m;
        var msg = '';
        if (arg instanceof Array) {
            msg += '[';
            for (m = 0; m < arg.length; m++) {
                if (m) {
                    msg += ', ';
                }
                msg += tomsg(arg[m]);
            }
            msg += ']';
        } else if (arg instanceof Function) {
            msg = '';
        } else if (arg instanceof Object && !arg.__class) {
            msg += '{';
            var members = Object.getOwnPropertyNames(arg).sort();
            for (m = 0; m < members.length; m++) {
                if (arg[members[m]] instanceof Function) {
                    continue;
                }
                if (m) {
                    msg += ',';
                }
                msg += members[m] + ': ';
                msg += tomsg(arg[members[m]]);
            }
            msg += '}';
        } else {
            msg += arg;
        }
        return msg;
    }

    var msg = '';
    for (var i = 0; i < args.length; i++) {
        if (i) {
            msg += ' ';
        }
        msg += tomsg(args[i]);
    }
    d.messages.push(msg);

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

/**
 * TODO: Docs.
 */
d.throw = function(args) {
    var args = Array.prototype.slice.call(arguments);
    d.apply(null, args);
    // TODO: Implement stringifying of arguments.
    throw "COA ERROR";
}

try {
    module.exports = d;
} catch(e) {
}