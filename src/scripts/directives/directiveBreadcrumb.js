(function () {
    "use strict";
    angular.module("app.directives")
        .directive('directiveBreadcrumb', ['$location', function($location) {
            return {
                templateUrl: "dist/templates/directives/dx-breadcrumb.html",
                link: function ($scope) {
                    var breadcrumb = [
                        {
                            page: '/home', title: "Home", order: 0
                        }
                    ];

                    var fullPath = $location.path();
                    var rootPath = fullPath.split('/')[1];

                    var currentPage = breadcrumb.filter(function(item){
                        return fullPath == item.page;
                    });

                    if (currentPage && currentPage.length > 0)
                    {
                        $scope.Breadcrumbs = breadcrumb.filter(function(item){
                            var itemRootPath =  item.page.split('/')[1];
                            if (item.page == currentPage[0].page){
                                $scope.CurrentBreadcrumb = item;
                            }
                            item.page = '#' +item.page;
                            return rootPath == itemRootPath && item.order < currentPage[0].order;
                        });
                    }
                }
            };
        }]);
})();