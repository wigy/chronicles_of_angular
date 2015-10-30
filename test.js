
var TestApp = angular.module('TestApp', ['coa.input.keyboard',
                                         'coa.audio.player',
                                         'coa.auth'
                                         ]);

TestApp.controller('TestAppController', ['$scope', 'coaPlayer', 'User',

    function($scope, coaPlayer, User) {

        // TODO: Just testing.
        d(new User({name: "wigy"}));

        coaPlayer.load({'test' : 'sounds/test.mp3'});

        $scope.keyPressed = '-';
        $scope.coaPlayer = coaPlayer;

        $scope.storeKey = function(name) {
            $scope.keyPressed = name;
        };
    }
]);
