(function () {
    "use strict";

    function wizardDataManager() {
        return {};
    }


    function wizardController($scope, $q) {
        var wizardDefinitionDefer = $q.defer();
        $scope.wizardDefinition = wizardDefinitionDefer.promise;

        function resolveWizardDefinition() {
            var dataManager = wizardDataManager();

            var wizardDefinition = {
                steps: [],
                startFrom: 0,
                syncFunction: dataManager.SyncData,
                dataManager: dataManager,
                cancel: function () {},

            };

            var firstStep = {
                template: '/dist/templates/views/wizard.FirstStep.html',
                controller: 'WizardFirstStepController',
                title: 'First Step'
            };

            var secondStep = {
                template: '/dist/templates/views/wizard.SecondStep.html',
                controller: 'WizardSecondStepController',
                title: 'Second Step'
            };

            wizardDefinition.steps = [firstStep, secondStep];
            wizardDefinitionDefer.resolve(wizardDefinition);
        }

        resolveWizardDefinition();
    }

    angular.module("app.controllers").controller("WizardController", wizardController);
})();