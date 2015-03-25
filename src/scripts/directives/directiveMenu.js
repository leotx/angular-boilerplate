(function () {
    "use strict";

    angular.module("app.directives")
        .directive('directiveMenu', ['$location', function($location) {
            return {
                templateUrl: "dist/templates/directives/dx-menu.html",
                link :function (scope) {
                    var menus = [
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

                    scope.MenusFiltered = angular.copy(menus);
                    scope.filterMenu = '';
                    scope.$watch('filterMenu', function(changed){
                        if (changed){
                            var filter = scope.filterMenu.toLowerCase();
                            var menuToFilter = angular.copy(menus);

                            scope.MenusFiltered = menuToFilter.filter(function (item){
                                if (!item.subMenus || item.subMenus.length === 0)
                                    return item.title.toLowerCase().indexOf(filter) > -1;

                                var subMenu = item.subMenus.filter(function(subItem) {
                                    return subItem.title.toLowerCase().indexOf(filter) > -1;
                                });

                                if (subMenu && subMenu.length > 0) {
                                    item.subMenus = subMenu;
                                    item.showSubMenu = true;

                                    return item;
                                }
                            });
                        }
                        else{
                            scope.MenusFiltered = angular.copy(menus);
                        }
                    });

                    scope.menuRedirect = function(index){
                        var menu = scope.MenusFiltered[index];

                        if (menu.subMenus && menu.subMenus.length > 0) {
                            menu.showSubMenu = !menu.showSubMenu;
                        } else {
                            $location.url(menu.route);
                        }
                    };
                }
            };
        }]);
})();