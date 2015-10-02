'use strict';

var app = angular.module('myApp');

app.controller('AuthController', ['$scope', '$location', 'Auth', '$routeParams',
    function($scope, $location, Auth, $routeParams) {
        $scope.loginError = $routeParams.error;
        $scope.user = {};
        $scope.dataLoading = false;

        $scope.login = function() {
            $scope.loginError = "";
            $scope.dataLoading = true;
            var promise = Auth.login($scope.user);
            promise.then(function(status) { //Success
                $scope.dataLoading = false;
                $location.path("/");
            }, function(status) { //Failed
                $scope.dataLoading = false;
                $scope.loginError = status;
            });
        }

        $scope.signup = function() {
            $scope.loginError = "";
            $scope.dataLoading = true;
            var promise = Auth.signup($scope.user);
            promise.then(function(status) { //Success
                $scope.dataLoading = false;
                $location.path("/");
            }, function(status) { //Failed
                $scope.dataLoading = false;
                $scope.loginError = status;
            });
        }

    }
]);

app.controller('NavbarController', ['$scope', '$location', 'Auth',
    function($scope, $location, Auth) {

        $scope.logout = function() {
            var promise = Auth.logout();
            promise.then(function(status) { //Success
                $location.path("/login");
            }, function(status) { //Failed

            });
        }
    }
]);

app.controller('MainController', ['$scope', 'Auth',
    function($scope, Auth) {

    }
]);

app.controller('ToDoController', ['$scope', '$http',
    function($scope, $http) {
        var refresh = function() {
            $http.get('/api/todolist').success(function(res) {
                $scope.todolist = res;
            });
        }
        refresh();

        $scope.addTask = function() {
            if ($scope.task.name != "") {
                $http.post('/api/todolist/addtask', $scope.task).success(function(res) {
                    $scope.task = "";
                    $scope.todolist = res;
                    refresh();
                });
            }
        };

        $scope.marktaskdone = function(id) {
            $http.post('/api/todolist/edittask/markdone/' + id).success(function(res) {
                $scope.todolist = res;
                refresh();
            });
        };

        $scope.marktasknotdone = function(id) {
            $http.post('/api/todolist/edittask/marknotdone/' + id).success(function(res) {
                $scope.todolist = res;
                refresh();
            });
        };

        $scope.removetask = function(id) {
            $http.delete('/api/todolist/removetask/' + id).success(function(res) {
                $scope.todolist = res;
                refresh();
            });
        };

    }
]);