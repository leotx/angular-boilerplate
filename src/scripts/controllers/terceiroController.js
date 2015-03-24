(function () {
    "use strict";
    function controller($scope, terceiroService) {
    	$scope.Title = "Teste";

        var terceiros = terceiroService.getTerceiros();
    }

    angular.module("app.controllers")
        .controller("terceiroController",[
            "$scope",
            "terceiroService",
            controller
        ]
    );
})();