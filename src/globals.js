/**
 * Dump all arguments to the console.
 *
 * @fuction d
 * @param arg1 {any} Any number of arguments can be given.
 * @param ...
 * @param argN {any}
 * @return The last argument <i>argN</i>.
 */
function d(arg1, arg2, argN) {

    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
        return;
    }
    console.log.apply(console, args);
    return args[args.length - 1];
}
