
var TestApp = angular.module('TestApp', ['coa.input.keyboard',
                                         'coa.audio.player']);

TestApp.controller('TestAppController', ['$scope',

    function($scope) {

        $scope.keyPressed = '-';

        $scope.storeKey = function(name) {
            d('Key pressed:', name)
            // TODO: Hmm, does not display anything?
            $scope.keyPressed = name;
        };
    }
]);
