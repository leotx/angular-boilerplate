(function () {
    "use strict";

    var repository = function ($http) {
        return {
            getAll: function () {
                alert("Mock!");
            }
        };
    };

    angular.module("app.repository").factory("terceiroRepositoryMock", ['$http', repository]);

})();