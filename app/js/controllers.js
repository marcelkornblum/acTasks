'use strict';

/* Controllers */


function ProjectListCtrl($scope, Collab, Auth, $location) 
{
  $scope.projects = Collab.query({path: 'projects', key: Auth.api_key});
  $scope.orderProp = 'name';
}
ProjectListCtrl.$inject = ['$scope', 'Collab', 'Auth', '$location'];


function ProjectDetailCtrl($scope, $routeParams, Collab) 
{
  $scope.project = Collab.get({path: 'projects/' + $routeParams.projectSlug});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Collab'];


function ProjectOverviewCtrl($scope, $routeParams, Collab) 
{
  $scope.project = Collab.get({path: 'projects/' + $routeParams.projectSlug});
  $scope.milestones = Collab.query({path: 'projects/' + $routeParams.projectSlug + '/milestones'});
  $scope.tasks = Collab.query({path: 'projects/' + $routeParams.projectSlug + '/tasks'});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Collab'];





function TaskListCtrl($scope, $routeParams, Collab) 
{
  $scope.tasks = Collab.query({path: 'projects/' + $routeParams.projectSlug + '/tasks'});
  $scope.orderProp = 'name';
}
TaskListCtrl.$inject = ['$scope', '$routeParams', 'Collab'];


function TaskDetailCtrl($scope, $routeParams, Collab) 
{
  $scope.task = Collab.get({path: 'projects/' + $routeParams.projectSlug + '/tasks/' + $routeParams.taskId});
}
TaskDetailCtrl.$inject = ['$scope', '$routeParams', 'Collab'];





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




