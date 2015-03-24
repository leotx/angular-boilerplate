(function () {
    "use strict";
    function routesConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'dist/templates/views/home/home.html',
                controller: 'HomeController'
            })
            .when('/wizard', {
                templateUrl: 'dist/templates/views/wizard/wizard.html',
                controller: 'WizardController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
    angular.module('app').config(['$routeProvider', routesConfig]);
})();