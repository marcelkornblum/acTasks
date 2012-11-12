'use strict';

/* Controllers */


function ProjectListCtrl($scope, Projects, Labels, Categories, Auth, $location) 
{
  $scope.projects = Projects.query();
  $scope.projectlabels = Labels.query();
  $scope.projectcategories = Categories.query();

  $scope.orderProp = 'name';
  $scope.selectedLabel = "";
  $scope.selectedCategory = "";

  $scope.select = function(project) {
    $scope.selected = project;
  };
}
ProjectListCtrl.$inject = ['$scope', 'Projects', 'Labels', 'Categories', 'Auth', '$location'];


function ProjectDetailCtrl($scope, $routeParams, Project, Auth) 
{
  $scope.project = Project.get({projectSlug: $routeParams.projectSlug});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Project', 'Auth'];


function ProjectOverviewCtrl($scope, $routeParams, Project, Tasks, Auth) 
{
  $scope.project = Project.get({projectSlug: $routeParams.projectSlug});
  //$scope.milestones = Project.query({path: 'projects/' + $routeParams.projectSlug + '/milestones', key: Auth.api_key});
  $scope.tasks = Tasks.query({projectSlug: $routeParams.projectSlug});
}
ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Project', 'Tasks', 'Auth'];





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








function CombinedListCtrl($scope, Projects, Tasks, Labels, Categories, Auth, $location) 
{
  $scope.projects = Projects.query();
  $scope.projectlabels = Labels.query();
  $scope.projectcategories = Categories.query();
  $scope.tasks = Array();  

  $scope.orderProp = 'name';
  $scope.selectedLabel = "";
  $scope.selectedCategory = "";

  $scope.selectproject = function(project) {
    $scope.selectedproject = project;
    console.log(project.slug);
    $scope.tasks = Tasks.query({'projectSlug': project.slug});
  };
}
CombinedListCtrl.$inject = ['$scope', 'Projects', 'Tasks', 'Labels', 'Categories', 'Auth', '$location'];





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




