(function () {
    "use strict";
    function service($http) {
      var serviceRouteConstant = '/';
      return {
          default: {
        }
      };
    }
    angular.module("app.services").factory("homeService", ['$http', service]);
})();