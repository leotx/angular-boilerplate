(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveFooter', function () {
            return {
                templateUrl: "dist/templates/directives/dx-footer.html",
                link :function ($scope) {

                }
            };
        });
})();