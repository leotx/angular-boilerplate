(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveHeader', function () {
            return {
                templateUrl: "dist/templates/directives/dx-header.html",
                link :function ($scope) {
                    $scope.user = {
                        ref : '#',
                        imgUrl : "dist/images/user.jpg",
                        name : "Chuck Norris",
                        company : "Acme Unlimited"
                    };

                    $scope.notifications = {
                        count : 13
                    };
                }
            };
        });
})();