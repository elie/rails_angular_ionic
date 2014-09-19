app.controller "TodoCtrl", ["$scope", "$http", ($scope, $http) ->

  $scope.todos = []
  $scope.newToDo = {}
  # if todo.checked is undefined
  #     todo.checked == false

  $scope.gettodos = ->
  # make a GET request to /todos.json
    $http.get("http://localhost:3000/todos.json").success (data) ->
      $scope.todos = data

  $scope.gettodos()

  # CREATE
  $scope.addToDo = ->
    $http.post("http://localhost:3000/todos.json", $scope.newToDo).success (data) ->
      $scope.todos.push(data)
      $scope.newToDo = {}

  # DELETE
  $scope.deleteToDo = (todo) ->
    conf = confirm "Are you sure?"
    if conf
      $http.delete("http://localhost:3000/todos/#{todo.id}.json").success (data) ->
        $scope.todos.splice($scope.todos.indexOf(todo),1)

  # CHANGE STATUS
  $scope.markCompleted = (todo) ->
    console.log todo.checked
    todo.completed = todo.completed == false ? true: false;
    todo.checked = todo.completed == false ? false: true;

    $http.put("http://localhost:3000/todos/#{todo.id}.json", todo).success (data) ->
  # OPEN EDITING FORM
  $scope.openForm = () ->
    this.editing = true
    this.viewing = true
  # EDIT
  $scope.editToDo = (todo) ->
    this.editing = false
    this.viewing = false
    $http.put("http://localhost:3000/todos/#{todo.id}.json", todo).success (data) ->
]

