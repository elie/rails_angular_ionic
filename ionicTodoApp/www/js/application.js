var app;

app = angular.module("starter", ["ionic"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state("main", {
    url: "/",
    templateUrl: "templates/main.html",
    controller: "TodoCtrl"
  });
  return $urlRouterProvider.otherwise("/");
});

app.controller("TodoCtrl", [
  "$scope", "$http", function($scope, $http) {
    $scope.todos = [];
    $scope.newToDo = {};
    $scope.gettodos = function() {
      return $http.get("http://localhost:3000/todos.json").success(function(data) {
        return $scope.todos = data;
      });
    };
    $scope.gettodos();
    $scope.addToDo = function() {
      return $http.post("http://localhost:3000/todos.json", $scope.newToDo).success(function(data) {
        $scope.todos.push(data);
        return $scope.newToDo = {};
      });
    };
    $scope.deleteToDo = function(todo) {
      var conf;
      conf = confirm("Are you sure?");
      if (conf) {
        return $http["delete"]("http://localhost:3000/todos/" + todo.id + ".json").success(function(data) {
          return $scope.todos.splice($scope.todos.indexOf(todo), 1);
        });
      }
    };
    $scope.markCompleted = function(todo) {
      var _ref, _ref1;
      console.log(todo.checked);
      todo.completed = (_ref = todo.completed === false) != null ? _ref : {
        "true": false
      };
      todo.checked = (_ref1 = todo.completed === false) != null ? _ref1 : {
        "false": true
      };
      return $http.put("http://localhost:3000/todos/" + todo.id + ".json", todo).success(function(data) {});
    };
    $scope.openForm = function() {
      this.editing = true;
      return this.viewing = true;
    };
    return $scope.editToDo = function(todo) {
      this.editing = false;
      this.viewing = false;
      return $http.put("http://localhost:3000/todos/" + todo.id + ".json", todo).success(function(data) {});
    };
  }
]);
