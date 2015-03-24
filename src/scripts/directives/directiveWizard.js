(function () {
    'use strict';

    function wizardDirective($http, $controller, $templateCache, $compile) {

        var defObject = {
            restrict: 'E',
            templateUrl: 'dist/templates/directives/dx-wizard.html',
            link: function (scope, element, attrs) {
                var stepsDefinition;
                scope.newStepScope = undefined;
                scope.newStepCtrl = undefined;

                function areStepsExistent() {
                    return stepsDefinition && stepsDefinition.steps;
                }

                function loadStepTemplate(templateToFetch, successCallback) {
                    $http.get(templateToFetch, { cache: $templateCache })
						.then(function (response) {
						    successCallback(response.data);
						});
                }

                function renderStep(stepTemplate, stepController) {
                    scope.newStepScope = scope.$new(true);
                    scope.newStepCtrl = $controller(stepController, {
                        $scope: scope.newStepScope,
                        stepStatus: scope.stepsDefinition.steps[stepsDefinition.startFrom].status
                    });

                    element.find('#wizardStep').html(stepTemplate);
                    element.children().data('$ngControllerController', scope.newStepCtrl);

                    $compile(element.find('#wizardStep').contents())(scope.newStepScope);
                }

                function loadStep() {
                    if (areStepsExistent()) {

                        scope.activeStep = stepsDefinition.startFrom ? stepsDefinition.startFrom : 0;

                        scope.stepsDefinition = stepsDefinition;

                        scope.stepsDefinition.steps = stepsDefinition.steps.map(function (currentElement, index) {
                            if (index < scope.activeStep) {
                                currentElement.status =
                                {
                                    done: true,
                                    active: false,
                                    editing: false
                                };
                            } else if (index == scope.activeStep) {
                                currentElement.status =
                                {
                                    done: scope.stepsDefinition.allDone,
                                    active: true,
                                    editing: false
                                };
                            } else {
                                currentElement.status =
                                {
                                    done: scope.stepsDefinition.allDone,
                                    active: false,
                                    editing: false
                                };
                            }

                            return currentElement;
                        });

                        var steps = scope.stepsDefinition.steps;
                        if (steps[scope.activeStep]) {

                            loadStepTemplate(steps[scope.activeStep].template, function (template) {

                                if (scope.stepsDefinition.syncFunction) {

                                    scope.stepsDefinition.syncFunction().then(function () {
                                        renderStep(template, steps[scope.activeStep].controller);
                                    });
                                } else {

                                    renderStep(template, steps[scope.activeStep].controller);
                                }
                            });
                        }
                    } else {

                        console.error('No steps defined to render.');
                    }
                }

                attrs.$observe('stepsDefinition', function (val) {

                    var promise = scope.$eval(val);

                    promise.then(function (wizardDefinition) {

                        stepsDefinition = wizardDefinition;
                        loadStep();
                    });
                });
            },
            controller: function ($scope, $timeout) {
                function destroyPreviousScope() {
                    if ($scope.newStepScope) {

                        $scope.newStepScope.$destroy();

                        $scope.newStepScope = undefined;
                        $scope.newStepCtrl = undefined;
                    }
                }

                function setCurrentStepState(isActive, isEditing, isDone) {
                    isDone = isDone || $scope.stepsDefinition.steps[$scope.activeStep].status.done || false;

                    $scope.stepsDefinition.steps[$scope.activeStep].status =
				    {
				        done: isDone,
				        active: isActive,
				        editing: isEditing
				    };
                }

                function loadNewStepTemplate(templateToFetch, successCallback) {
                    $http.get(templateToFetch, { cache: $templateCache })
						.then(function (response) {
						    successCallback(response.data);
						});
                }

                function renderNewStep(newStepTemplate, newStepController) {
                    setCurrentStepState(true, false);

                    $scope.newStepScope = $scope.$new(true);
                    $scope.newStepCtrl = $controller(newStepController, {
                        $scope: $scope.newStepScope,
                        stepStatus: $scope.stepsDefinition.steps[$scope.activeStep].status
                    });

                    angular.element('#wizardStep').html(newStepTemplate);
                    angular.element('#wizardStep').children().data('$ngControllerController', $scope.newStepCtrl);

                    $compile(angular.element('#wizardStep').contents())($scope.newStepScope);
                }

                function changeStep(step) {
                    if (step) {
                        $timeout(function () {
                            destroyPreviousScope();

                            loadNewStepTemplate(step.template, function (template) {
                                renderNewStep(template, step.controller);
                            });
                        });
                    }
                }

                $scope.Cancel = function () {
                    $scope.stepsDefinition.cancel();
                };

                $scope.TriggerNextStep = function () {
                    $scope.$broadcast('RequestNextStep');
                };

                $scope.TriggerPrevStep = function () {
                    $scope.$broadcast('RequestPrevStep');
                };

                $scope.showCancelButton = function(){
                    if(!$scope.stepsDefinition || ! $scope.stepsDefinition.showCancelButton){
                        return true;
                    }else{
                        return $scope.stepsDefinition.showCancelButton();    
                    }
                    
                };

                $scope.$on('NextStepAccepted', function () {
                    if ($scope.activeStep + 1 <= $scope.stepsDefinition.steps.length) {
                        setCurrentStepState(false, false, true);

                        $scope.activeStep++;
                        var nextStep = $scope.stepsDefinition.steps[$scope.activeStep];

                        changeStep(nextStep);
                    }
                });

                $scope.$on('PrevStepAccepted', function () {
                    if ($scope.activeStep - 1 >= 0) {
                        setCurrentStepState(false, true);

                        $scope.activeStep--;
                        var prevStep = $scope.stepsDefinition.steps[$scope.activeStep];
                        changeStep(prevStep);
                    }
                });

            }
        };

        return defObject;
    }

    angular.module('app.directives').directive('directiveWizard', ['$http', '$controller', '$templateCache', '$compile', wizardDirective]);
})();
