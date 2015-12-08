(function() {

    var module = angular.module('coa.audio');

    // Audio files loaded as object with audio names as keys and `Audio` instances
    // as values.
    var audio = {};

    /**
     * @ngdoc method
     * @name load
     * @methodOf coa.audio.service:player
     * @param {Object} mapping An object with sound names as keys and paths to the sound files as values.
     * @description
     *
     * Load sound files.
     */
    function load(mapping) {
        angular.forEach(mapping, function(v, k) {audio[k] = new Audio(v);});
    }

    /**
     * @ngdoc method
     * @name play
     * @methodOf coa.audio.service:player
     * @param {String} name The name of the sound to play.
     * @param {String} timestamp If DEBUG is set, then names are printed on console with optional timestamp string.
     * @description
     *
     * Play the sound.
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
     * @ngdoc service
     * @name coa.audio.service:player
     * @description
     *
     * Service to load and play sounds.
     * <pre>
     *   player.load({
     *       one : 'sounds/one.mp3',
     *       two : 'sounds/two.mp3',
     *   });
     *   ...
     *   player.play('one');
     * </pre>
     */
    module.service('player', [function() {
        return {
            load: load,
            play: play,
        };
    }]);

})();
