(function () {
    "use strict";
    angular.module("app.directives")
        .directive('directiveGrid', ["$filter", function($filter) {
            return {
                templateUrl: "dist/templates/directives/dx-grid.html",
                scope:    {
                    data:   '=',
                    columns: '=',
                    add: '='
                },
                link: function (scope) {
                    scope.searchKeyword = undefined;
                    scope.gap = 5;
                    scope.filteredItems = [];
                    scope.groupedItems = [];
                    scope.itemsPerPage = 10;
                    scope.pagedItems = [];
                    scope.currentPage = 0;
                    scope.Sort = {
                        column: '',
                        descending: false
                    };

                    angular.element('.ui.dropdown').dropdown();

                    scope.changeSorting = function(column) {
                        var sort = scope.Sort;

                        if (sort.column == column) {
                            sort.descending = !sort.descending;
                        } else {
                            sort.column = column;
                            sort.descending = false;
                        }

                        scope.search();
                    };

                    var searchMatch = function (haystack, needle) {
                        if (!needle) {
                            return true;
                        }
                        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                    };

                    scope.search = function () {
                        scope.filteredItems = $filter('filter')(scope.data, function (item) {
                            for(var attr in item) {
                                if (searchMatch(item[attr], scope.query))
                                    return true;
                            }
                            return false;
                        });

                        if (scope.Sort.column !== '') {
                            scope.filteredItems = $filter('orderBy')(scope.filteredItems, scope.Sort.column, scope.Sort.descending);
                        }

                        if (scope.searchKeyword){
                            scope.filteredItems = $filter('filter')(scope.filteredItems, scope.searchKeyword);
                        }

                        scope.currentPage = 0;
                        scope.groupToPages();
                    };

                    scope.groupToPages = function () {
                        scope.pagedItems = [];

                        for (var i = 0; i < scope.filteredItems.length; i++) {
                            if (i % scope.itemsPerPage === 0) {
                                scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
                            } else {
                                scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
                            }
                        }
                    };

                    scope.range = function (size, start, end) {
                        var ret = [];

                        if (size < end) {
                            end = size;
                            start = 0;
                        }
                        for (var i = start; i < end; i++) {
                            ret.push(i);
                        }

                        return ret;
                    };

                    scope.prevPage = function () {
                        if (scope.currentPage > 0) {
                            scope.currentPage--;
                        }
                    };

                    scope.nextPage = function () {
                        if (scope.currentPage < scope.pagedItems.length - 1) {
                            scope.currentPage++;
                        }
                    };

                    scope.setPage = function () {
                        scope.currentPage = this.n;
                    };

                    scope.search();
                }
            };
        }]);
})();