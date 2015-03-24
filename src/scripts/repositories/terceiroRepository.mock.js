(function () {
    "use strict";

    var repository = function ($http) {
        return {
            foo: function () {
                alert("Foo!");
            }
        };
    };

    angular.module("app.repository").factory("terceiroRepositoryMock", ['$http', repository]);

})();