(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveMenu', ['$location', function($location) {
            return {
                templateUrl: "dist/templates/directives/dx-menu.html",
                link :function ($scope) {
                    $scope.Menus = [
                        {
                            title: "Home",
                            icon: "home",
                            showSubMenu: false,
                            subMenus: [
                                {
                                    title: "Help",
                                    route: '#/home'
                                }
                            ]
                        },
                        {
                            title: "Browse",
                            icon: "grid layout",
                            showSubMenu: false,
                            route: '/'
                        }
                    ];

                    $scope.menuRedirect = function(index){
                        var menu = $scope.Menus[index];

                        if (menu.subMenus && menu.subMenus.length > 0) {
                            menu.showSubMenu = !menu.showSubMenu
                        } else {
                            $location.url(menu.route);
                        }
                    };
                }
            };
        }]);
})();