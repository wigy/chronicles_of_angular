(function() {

	'use strict';

	var module = angular.module('coa.input.keyboard', []);

/**
 * Service to load and play sounds.
 */
TimerApp.service('PlaySound', [function() {

    var audio = {};
    audio['buzzer'] = new Audio('sounds/buzzer.mp3');
    audio['whistle'] = new Audio('sounds/whistle.mp3');
    audio['start'] = new Audio('sounds/start.mp3');
    audio['done'] = new Audio('sounds/done.mp3');
    audio['1'] = new Audio('sounds/1.mp3');
    audio['2'] = new Audio('sounds/2.mp3');
    audio['3'] = new Audio('sounds/3.mp3');

    return function(name, timestamp) {
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
}]);
