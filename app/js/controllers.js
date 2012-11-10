'use strict';

/* Controllers */


function ProjectListCtrl($scope, Collab) 
{
  $scope.projects = Collab.query({path: 'projects'});
  $scope.orderProp = 'name';

  // $scope.projectlabels = Collab.query({path: 'info/labels/project'});
  // $scope.projectcategories = Collab.query({path: 'projects/categories'});

  // $scope.compProp = 'comp-0';
  // $scope.archProp = 'arch-0';
  // $scope.catProp = "New York";
  // $scope.labelProp = "New York";

  // $scope.categoryFilter = function(project)
  // {
  // 	// if (project.category == undefined)
  // 	//   return true;

  // 	return project.category.id == $scope.category;
  // };
/*
  $scope.labelProp = function(project)
  {
  	if (project.label == undefined)
  	  return false;
  	return project.label.name == $scope.label;
  };
  $scope.archProp = function(project)
  {
  	return 'arch-' + project.is_archived = $scope.;
  };

  $scope.compProp = function(project)
  {
  	return project.is_completed;
  };
*/
}
ProjectListCtrl.$inject = ['$scope', 'Collab'];


function ProjectDetailCtrl($scope, $routeParams, Collab) 
{
 // $scope.project = Collab.get({path: 'project'});
 // $scope.orderProp = 'name';

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




 /*
function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}
 
//PhoneListCtrl.$inject = ['$scope', 'Phone'];
 
 
function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });
 
  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}
*/