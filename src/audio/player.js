(function() {

    var module = angular.module('coa.audio');

    // Audio files loaded as object with audio names as keys and `Audio` instances
    // as values.
    var audio = {};

    /**
     * Load sound files.
     *
     * @function audio.coaPlayer.load
     * @memberof audio.coaPlayer
     * @param mapping {Object} An object with sound names as key and paths to the sound files as values.
     */
    function load(mapping) {
        angular.forEach(mapping, function(v, k) {audio[k] = new Audio(v);});
    }

    /**
     * Play the sound.
     *
     * @function audio.coaPlayer.play
     * @memberof audio.coaPlayer
     * @param name {String} The name of the sound to play.
     * @param timestamp {String} If DEBUG is set, then names are printed on console with optional timestamp string.
     */
    function play(name, timestamp) {
        if (name === 'list') {
            return Object.keys(audio);
        }
        if (!(name in audio)) {
            d("Invalid audio name:", name);
            return;
        }

        if (typeof(DEBUG) !== "undefined" && DEBUG) {
            d((timestamp ? timestamp : '') + "   >>> " + name + " <<<");
        } else {
            audio[name].play();
        }
    }

    /**
     * Service to load and play sounds.
     *
     * @class audio.coaPlayer
     * @memberof audio
     */
    module.service('coaPlayer', [function() {
        return {
            load: load,
            play: play,
        };
    }]);

})();
