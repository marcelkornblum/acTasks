'use strict';

/* Controllers */


function ProjectListCtrl($scope, Projects, Auth, $location) 
{
  var projects = Projects.query();

  $scope.projects = projects;
  $scope.orderProp = 'name';
}
ProjectListCtrl.$inject = ['$scope', 'Projects', 'Auth', '$location'];


function ProjectDetailCtrl($scope, $routeParams, Project, Auth) 
{
  $scope.project = Project.get({projectSlug: $routeParams.projectSlug});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Project', 'Auth'];


function ProjectOverviewCtrl($scope, $routeParams, Project, Task, Auth) 
{
  $scope.project = Project.get({projectSlug: $routeParams.projectSlug});
  //$scope.milestones = Project.query({path: 'projects/' + $routeParams.projectSlug + '/milestones', key: Auth.api_key});
  $scope.tasks = Tasks.query({projectSlug: $routeParams.projectSlug});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Project', 'Task', 'Auth'];





function TaskListCtrl($scope, $routeParams, Tasks, Auth) 
{
  $scope.tasks = Tasks.query({projectSlug: $routeParams.projectSlug});
  $scope.orderProp = 'name';
}
TaskListCtrl.$inject = ['$scope', '$routeParams', 'Tasks', 'Auth'];


function TaskDetailCtrl($scope, $routeParams, Task, Auth) 
{
  $scope.task = Task.get({projectSlug: $routeParams.projectSlug, taskId: $routeParams.taskId});
}
TaskDetailCtrl.$inject = ['$scope', '$routeParams', 'Task', 'Auth'];





function AuthCtrl($scope, Auth, $http) 
{
  $scope.auth = Auth
  $scope.newUrl = Auth.api_url
  $scope.newKey = Auth.api_key
  $scope.save = function() {
    Auth.save($scope.newUrl, $scope.newKey)
  }
  $scope.test = function() {
    Auth.test($scope.newUrl, $scope.newKey, $http)
  }

  //$scope.task = Auth.get({path: 'projects/' + $routeParams.projectSlug + '/tasks/' + $routeParams.taskId});
}
AuthCtrl.$inject = ['$scope', 'Auth', '$http'];




