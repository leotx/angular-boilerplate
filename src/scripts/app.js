(function () {
    "use strict";

    angular.module('app.services', ['ngResource']);
    angular.module('app.controllers', ['app.services']);
    angular.module('app.directives', []);

    angular.module('app', [
        'app.controllers',
        'app.directives',
        'app.services',
        'ngRoute'
    ]);

})();
