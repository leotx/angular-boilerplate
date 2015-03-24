(function () {
    "use strict";
    angular.module("app.directives")
        .directive('directiveGrid', function() {
            return {
                templateUrl: "dist/templates/directives/dx-grid.html",
                scope:    {
                    data:   '=',
                    columns: '='
                },
                link: function (scope) {
                    scope.Sort = {
                        column: '',
                        descending: false
                    };

                    scope.changeSorting = function(column) {
                        var sort = scope.Sort;

                        if (sort.column == column) {
                            sort.descending = !sort.descending;
                        } else {
                            sort.column = column;
                            sort.descending = false;
                        }
                    };
                }
            };
        });
})();