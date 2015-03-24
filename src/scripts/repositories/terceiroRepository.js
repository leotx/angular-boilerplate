(function () {
    "use strict";

    var repository = function ($http) {
        return {
            getAll: function () {
                alert("Real!");
            }
        };
    };

    angular.module("app.repository").factory("terceiroRepository", ['$http', repository]);

})();