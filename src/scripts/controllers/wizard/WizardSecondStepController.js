(function () {
    "use strict";

    function wizardSecondStepController($scope) {
        $scope.$on('RequestNextStep', function () {
            $scope.$emit('NextStepAccepted');
        });

        $scope.$on('RequestPrevStep', function () {
            $scope.$emit('PrevStepAccepted');
        });
    }

    angular.module("app.controllers").controller("WizardSecondStepController", wizardSecondStepController);
})();