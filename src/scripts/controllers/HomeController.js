(function () {
    "use strict";
    function homeController($scope) {
        $scope.Columns = [
            {
                name: "First Name",
                value: "firstName"
            },
            {
                name: "Last Name",
                value: "lastName"
            },
            {
                name: "Age",
                value: "age"
            }
        ];

        $scope.Data = [{
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        },{
            firstName: 'Frank',
            lastName: 'Burns',
            age: 54
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        },{
            firstName: 'Sue',
            lastName: 'Banter',
            age: 21
        }];
    }
    angular.module("app.controllers").controller("HomeController", ["$scope", homeController]);
})();