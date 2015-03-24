(function () {
    "use strict";

    function wizardFirstStepController($scope) {
        $scope.$on('RequestNextStep', function () {
            $scope.$emit('NextStepAccepted');
        });
    }

    angular.module("app.controllers").controller("WizardFirstStepController", wizardFirstStepController);
})();