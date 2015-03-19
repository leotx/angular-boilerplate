(function () {
    "use strict";
    function services($resource, $http) {
      var serviceRouteConstant = '/';
      return {
          default: {
        }
      };
    }
    angular.module("app.controllers").factory("Services", services);
})();