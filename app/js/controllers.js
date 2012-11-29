'use strict';

/* Controllers */

function CombinedListCtrl($scope, Projects, Tasks, Labels, Categories, People, Auth, $location) 
{
  $scope.me = People.me();
  $scope.projects = Projects.query();
  $scope.projectlabels = Labels.query();
  $scope.projectcategories = Categories.query();

  $scope.projectQuery = '';
  $scope.selectedProjectLabel = '';
  $scope.selectedProjectCategory = '';
  $scope.projectOrder = 'name';

  $scope.tasks = Array(); 
  $scope.taskcategories = [{'id':'', 'name':'ALL'}]; 
  $scope.tasklabels = Labels.taskQuery();

  $scope.selectproject = function(project) {
    $scope.selectedProject = project;
    $scope.selectedTask = '';
    $scope.tasks = Tasks.query($scope.selectedProject.slug);
    $scope.taskcategories = Categories.taskQuery($scope.selectedProject.slug);
    $scope.taskpeople = People.query($scope.selectedProject.slug);

    $scope.taskQuery = '';
    $scope.selectedTaskLabel = '';
    $scope.selectedTaskCategory = '';
    $scope.selectedTaskPriority = '';
    $scope.selectedTaskComplete = 0;
    $scope.selectedTaskArchived = 0;
    $scope.selectedTaskAssignee = $scope.me.id;
    console.log($scope.me);
    $scope.taskOrder = 'priority';
    $scope.taskReverse = true;
  };

  $scope.selecttask = function(task) {
    console.log(task.assignee_id);
    $scope.selectedTask = task;
    $scope.task = Tasks.get($scope.selectedProject.slug, task.slug);
    $scope.comments = '';//Tasks.get($scope.selectedProject.slug, task.slug);
  };
}


function AuthCtrl($scope, Auth, $http) 
{
  $scope.auth = Auth
  $scope.newUrl = Auth.api_url
  $scope.newKey = Auth.api_key
  $scope.newEmail = Auth.email
  $scope.save = function() {
    Auth.save($scope.newUrl, $scope.newKey)
  }
  $scope.test = function() {
    Auth.test($scope.newUrl, $scope.newKey, $http)
  }
  $scope.login = function() {
    Auth.test($scope.newEmail, $scope.password, $http)
  }

  //$scope.task = Auth.get({path: 'projects/' + $routeParams.projectSlug + '/tasks/' + $routeParams.taskId});
}
AuthCtrl.$inject = ['$scope', 'Auth', '$http'];




