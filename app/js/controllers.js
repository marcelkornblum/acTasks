'use strict';

/* Controllers */

function CombinedListCtrl($rootScope, $scope, Projects, Tasks, Labels, Categories, People, Auth, $location) 
{
  $scope.me = People.me();
  $scope.projects = Projects.query();
  $scope.projectlabels = Labels.query();
  $scope.projectcategories = Categories.query();

  $scope.projectQuery = '';
  $scope.selectedProjectLabel = '';
  $rootScope.selectedProjectCategory = '';
  $scope.projectOrder = 'name';

  $scope.tasks = Array(); 
  $scope.taskcategories = [{'id':'', 'name':'ALL'}]; 
  $scope.tasklabels = Labels.taskQuery();

  $scope.selectproject = function(project) {
    $scope.selectedProject = project;
    localStorage.selectedProjectId = project.id;
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
    //console.log($scope.me);
    $scope.taskOrder = 'priority';
    $scope.taskReverse = true;
  };

  $scope.selecttask = function(task) {
    console.log(task.assignee_id);
    localStorage.selectedTaskId = task.id;
    $scope.selectedTask = task;
    $scope.task = Tasks.get($scope.selectedProject.slug, task.slug);
    $scope.comments = Tasks.comments($scope.selectedProject.slug, task.slug);
  };

  $scope.updatetask = function(task) {
    console.log(task);
    Tasks.put($scope.selectedProject.slug, task);
  };


  // Quick and dirty 'remember your place' functions
  $scope.$watch('projects', function(newValue, oldValue, scope) {
    if (localStorage.selectedProjectId != undefined && newValue !== undefined)
    {
      angular.forEach(scope.projects.$$v, function(project) {
        if (project.id == localStorage.selectedProjectId) {
          scope.selectproject(project);
        }
      });
    }
  });
  $scope.$watch('tasks', function(newValue, oldValue, scope) {
    if (localStorage.selectedTaskId != undefined && newValue !== undefined)
    {
      angular.forEach(scope.tasks.$$v, function(task) {
        if (task.id == localStorage.selectedTaskId) {
          scope.selecttask(task);
        }
      });
    }
  });
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




