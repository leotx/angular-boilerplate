(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveHeader', function () {
            return {
                templateUrl: "dist/templates/directives/dx-header.html",
                link :function ($scope) {

                }
            };
        });
})();