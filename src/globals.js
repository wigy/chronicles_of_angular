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
    console.log.apply(console, args);
    return args[args.length - 1];
}
