'use strict';

/* Controllers *


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
// ProjectListCtrl.$inject = ['$scope', 'Projects', 'Labels', 'Categories', 'Auth', '$location'];


function ProjectDetailCtrl($scope, $routeParams, Projects, Auth) 
{
  $scope.project = Projects.get($routeParams.projectSlug);
}
// ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Projects', 'Auth'];


function ProjectOverviewCtrl($scope, $routeParams, Projects, Tasks, Auth) 
{
  $scope.project = Projects.get($routeParams.projectSlug);
  //$scope.milestones = Project.query({path: 'projects/' + $routeParams.projectSlug + '/milestones', key: Auth.api_key});
  $scope.tasks = Tasks.query({projectSlug: $routeParams.projectSlug});
}
// ProjectDetailCtrl.$inject = ['$scope', '$routeParams', 'Project', 'Tasks', 'Auth'];





function TaskListCtrl($scope, $routeParams, Tasks, Auth) 
{
  $scope.tasks = Tasks.query($routeParams.projectSlug);
  $scope.orderProp = 'name';
}
// TaskListCtrl.$inject = ['$scope', '$routeParams', 'Tasks', 'Auth'];


function TaskDetailCtrl($scope, $routeParams, Tasks, Auth) 
{
  $scope.task = Tasks.get($routeParams.projectSlug, $routeParams.taskId);
}
// TaskDetailCtrl.$inject = ['$scope', '$routeParams', 'Task', 'Auth'];



*/




function CombinedListCtrl($scope, Projects, Tasks, Labels, Categories, People, Auth, $location) 
{
  $scope.projects = Projects.query();
  $scope.projectlabels = Labels.query();
  $scope.projectcategories = Categories.query();
  //get all project people for task assignees

  $scope.projectQuery = '';
  $scope.selectedProjectLabel = "";
  $scope.selectedProjectCategory = "";
  $scope.projectOrder = 'name';

  $scope.tasks = Array(); 
  $scope.taskcategories = [{"id":"", "name":"ALL"}]; 
  $scope.tasklabels = Labels.taskQuery();

  $scope.selectproject = function(project) {
    $scope.selectedProject = project;
    $scope.tasks = Tasks.query($scope.selectedProject.slug);
    $scope.taskcategories = Categories.taskQuery($scope.selectedProject.slug);
    $scope.taskpeople = People.query($scope.selectedProject.slug);

    $scope.taskQuery = '';
    $scope.selectedTaskLabel = "";
    $scope.selectedTaskCategory = "";
    $scope.selectedTaskPriority = "";
    $scope.selectedTaskComplete = 0;
    $scope.selectedTaskArchived = 0;
    $scope.taskOrder = 'priority';
    $scope.taskReverse = true;
  };

  $scope.selecttask = function(task) {
    $scope.selectedTask = task;
    $scope.task = Tasks.get($scope.selectedProject.slug, task.slug);
    $scope.comments = '';//Tasks.get($scope.selectedProject.slug, task.slug);
  };
}

// CombinedListCtrl.$inject = ['$scope', 'Projects', 'Tasks', 'Labels', 'Categories', 'Auth', '$location', '$defer'];





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




