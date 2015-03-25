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
            age: 22
        },{
            firstName: 'Jane',
            lastName: 'Roe',
            age: 23
        },{
            firstName: 'Bart',
            lastName: 'Simpson',
            age: 59
        },{
            firstName: 'Chuck',
            lastName: 'Norris',
            age: 70
        },{
            firstName: 'Homer',
            lastName: 'Simpson',
            age: 13
        }];

        $scope.addTest = function(){
            console.log('Working!');
        };
    }
    angular.module("app.controllers").controller("HomeController", homeController);
})();