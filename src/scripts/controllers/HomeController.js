(function () {
    "use strict";
    function homeController($scope) {
    	$scope.Title = "Teste";
    }
    angular.module("app.controllers").controller("HomeController", ["$scope", homeController]);
})();