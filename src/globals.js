/**
 * TODO: Docs
 */
function d(arg1, arg2, argN) {

    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
        return;
    }
    console.log.apply(console, args);
    return args[args.length - 1];
}
