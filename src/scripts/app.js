(function () {
    "use strict";

    angular.module('app.utils', []);
    angular.module('app.repository', []);
    angular.module('app.services', ['ngResource']);
    angular.module('app.controllers', ['app.services']);
    angular.module('app.directives', []);

    angular.module('app', [
        'app.controllers',
        'app.directives',
        'app.services',
        'app.repository',
        'app.utils',
        'ngRoute'
    ]);

})();
