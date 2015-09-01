
var TestApp = angular.module('TestApp', ['coa.input.keyboard',
                                         'coa.audio.player']);

TestApp.controller('TestAppController', ['$scope', 'coaPlayer',

    function($scope, coaPlayer) {

        coaPlayer.load({'test' : 'sounds/test.mp3'});

        $scope.keyPressed = '-';
        $scope.coaPlayer = coaPlayer;

        $scope.storeKey = function(name) {
            d('Key pressed:', name)
            // TODO: Hmm, does not display anything?
            $scope.keyPressed = name;
        };
    }
]);
