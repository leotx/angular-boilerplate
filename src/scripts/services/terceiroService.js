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
    
    const USE_MOCK = true; // TODO: make global
    angular.module("app.services").factory("terceiroService", [USE_MOCK ? 'terceiroRepositoryMock' : 'terceiroRepository', '$interface', service]);
})();