(function () {
    "use strict";

    function service(terceiroRepositoryMock) {
      return {
          getTerceiros : function(){
              return terceiroRepositoryMock.foo();
        }
      };
    }

    // switch lines conforming your needs: Mocked or Real
    // angular.module("app.services").factory("terceiroService", ['terceiroRepository', service]); // real
    angular.module("app.services").factory("terceiroService", ['terceiroRepositoryMock', service]); // mocked
})();