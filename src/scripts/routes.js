(function () {
    "use strict";
    function routesConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/template/home.html',
                controller: 'HomeController',
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    angular.module('app').config(['$routeProvider', routesConfig]);
})();