(function () {
    "use strict";
    function routesConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'dist/templates/home.html',
                controller: 'homeController'
            })
            .when('/terceiros', {
                templateUrl: 'dist/templates/terceiros.html',
                controller: 'terceiroController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
    angular.module('app').config(['$routeProvider', routesConfig]);
})();