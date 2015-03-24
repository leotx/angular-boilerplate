(function () {
    "use strict";

    function service(terceiroRepository, $interface) {
        var ITerceiroRepository = $interface.define('ITerceiroRepository', ['getAll']);
        $interface.ensureImplements(terceiroRepository, ITerceiroRepository);


        return {
            getTerceiros: function () {
                return terceiroRepository.getAll();
            }
        };
    }

    // switch lines conforming your needs: Mocked or Real
    // angular.module("app.services").factory("terceiroService", ['terceiroRepository', service]); // real
    angular.module("app.services").factory("terceiroService", ['terceiroRepository', '$interface', service]); // mocked
})();