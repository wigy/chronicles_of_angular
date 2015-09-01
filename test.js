
var TestApp = angular.module('TestApp', ['coa.input.keyboard',
                                         'coa.audio.player']);

TestApp.controller('TestAppController', ['$scope',
    function($scope) {

        $scope.storeKey = function(name) {
            $scope.keyPressed = name;
        };
    }
]);
