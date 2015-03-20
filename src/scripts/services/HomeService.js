(function () {
    "use strict";
    function services($http) {
      var serviceRouteConstant = '/';
      return {
          default: {
        }
      };
    }
    angular.module("app.services").factory("Services", services);
})();