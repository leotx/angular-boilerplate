(function () {
    "use strict";
    function routesConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'dist/templates/home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
    angular.module('app').config(['$routeProvider', routesConfig]);
})();