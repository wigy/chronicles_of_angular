(function() {

	var module = angular.module('coa.audio.player', []);

	// Audio files loaded as object with audio names as keys and `Audio` instances
	// as values.
	var audio = {};

	/**
     * Load sound files.
     * TODO: Documentation.
     */
    function load(mapping) {
		d(mapping)
    };

	function play(name, timestamp) {
		if (name === 'list') {
			return Object.keys(audio);
		}
		if (!(name in audio)) {
			d("Invalid audio name:", name);
			return;
		}
		if (DEBUG) {
			d((timestamp ? timestamp : '') + "   >>> " + name + " <<<");
		} else {
			audio[name].play();
		}
	};

	/**
	 * Service to play sounds.
     * TODO: Documentation.
     */
	module.service('coaPlayer', [function() {
		return {
			load: load,
			play: play,
		};
	}]);

})();
