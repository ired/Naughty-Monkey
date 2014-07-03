/**
*
* made by Vladislav Gapurov
* thanks to dankogai for base64.js --> https://github.com/dankogai/js-base64
*
**/


(function() {
    'use strict';

    var monkeyModule = angular.module('monkeyApp', ['ngRoute','ngAnimate']);
    var stop;

    monkeyModule
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    controller: 'monkeyAppCtrl'
                })
        })

        .factory('Data', function() {
            return {};
        })
        .controller('helloCtrl', function($scope) {

        })
        .controller('monkeyAppCtrl', function($scope, Data, $interval, $timeout, $animate, $route, $location, $routeParams) {
            $scope.location = $location.path();
            $scope.data = Data;
            $scope.style = {};
            $scope.data.mouth = '';
            $scope.data.info = {};
            $scope.data.copylink = $location.absUrl();;
            $scope.data.balloon = Base64.decode(($scope.location).slice(1)) || '';
            $scope.enter = function() {
                $scope.data.balloon = $scope.data.mouth;
                $location.path(Base64.encodeURI($scope.data.balloon));
                $scope.data.copylink = $location.absUrl();
                $scope.data.mouth = '';
            };
            $scope.reset = function() {
                $scope.data.balloon = '';
                $scope.data.mouth = '';
                $scope.data.info.visibility = true;
            };
            $scope.link = function(e) {
                //$location.url('/' + $scope.data.balloon);
            };
            $scope.animMouth = {
                one: function(element, elClass, timeOut) {
                        $animate.addClass(element, elClass, function() {
                            if (timeOut) {
                                $timeout(function() {
                                    $animate.removeClass(element, elClass);
                                }, 90);
                            }
                        });
                    },
                many: function(element, elClass, timeOut, pause) {
                        stop = $interval(function(pause) {
                            $animate.addClass(element, elClass, function() {
                                if (timeOut) {
                                    $timeout(function() {
                                        $animate.removeClass(element, elClass);
                                    }, 90);
                                }
                            });
                        }, pause);
                    },
            }
            $scope.data.info.visibility = true;

            $scope.data.info.hide = function() {
                $timeout(function() {
                    $scope.data.info.visibility = false;
                }, 15000);
            }

        })

        .directive('textBalloon', function() {
            return {
                restrict: 'A',
                templateUrl: '/views/textBalloon.html'
            };
        })

        .directive('keyPress', function() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                        element.bind("keydown keypress", function (e) {
                            if(e.which == 13 || e.which == 10) {
                                scope.$apply(function (){
                                    scope.$eval(attrs.keyPress);
                                });

                                scope.animMouth.one(element,'big-mouth', true);
                                e.preventDefault();

                            } else {
                                scope.animMouth.one(element,'small-mouth', true);
                                if (scope.data.balloon != '') {
                                    scope.$apply(function (){
                                        scope.data.balloon = '';
                                        //scope.animMouth.many(element,'small-mouth', true, 3000);
                                    });

                                }
                            }
                        });
                    }
            };
        });
        // .directive('focusMe', function() {
        //     return {
        //     restrict: 'A',
        //         link: function(scope, element, attrs) {
        //             element[0].focus();
        //         }
        //     };
        // });


})();
