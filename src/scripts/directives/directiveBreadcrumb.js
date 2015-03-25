(function () {
    "use strict";
    angular.module("app.directives")
        .directive('directiveBreadcrumb', ['$location', '$rootScope', function($location, $rootScope) {
            return {
                templateUrl: "dist/templates/directives/dx-breadcrumb.html",
                link: function ($scope) {
                    var breadcrumb = [
                        { page: '/home', title: "Home", order: 0 },
                        { page: '/terceiros', title: "Terceiros", order: 0 }
                    ];

                    function loadScope(){
                        var fullPath = $location.path();
                        var rootPath = fullPath.split('/')[1];
                        var filterBreadcrumb = angular.copy(breadcrumb);

                        var currentPage = breadcrumb.filter(function(item){
                            return fullPath == item.page;
                        });

                        $scope.Breadcrumbs = filterBreadcrumb.filter(function(item){
                            var itemRootPath =  item.page.split('/')[1];
                            if (item.page == currentPage[0].page){
                                $scope.CurrentBreadcrumb = item;
                            }
                            item.page = '#' +item.page;
                            return rootPath == itemRootPath && item.order < currentPage[0].order;
                        });
                    }

                    $rootScope.$on("$routeChangeStart", loadScope);

                    loadScope();
                }
            };
        }]);
})();