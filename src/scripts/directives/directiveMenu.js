(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveMenu', function () {
            return {
                templateUrl: "dist/templates/directives/d-menu.html",
                link :function ($scope) {
                    $scope.Title = "Teste";
                }
            };
        });
})();