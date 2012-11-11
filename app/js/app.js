'use strict';

/*
// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
*/
angular.module('acTasks', ['acServices', 'acFilters', 'acDirectives', 'Auth']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'partials/login.html',   controller: AuthCtrl}).
        when('/combined', {templateUrl: 'partials/combined.html',   controller: ProjectListCtrl}).
        when('/projects', {templateUrl: 'partials/project-list.html',   controller: ProjectListCtrl}).
        when('/projects/:projectSlug', {templateUrl: 'partials/project-detail.html', controller: ProjectDetailCtrl}).
        when('/projects/:projectSlug/overview', {templateUrl: 'partials/project-overview.html',   controller: ProjectOverviewCtrl}).
        when('/projects/:projectSlug/tasks', {templateUrl: 'partials/task-list.html',   controller: TaskListCtrl}).
        when('/projects/:projectSlug/tasks/:taskId', {templateUrl: 'partials/task-detail.html', controller: TaskDetailCtrl}).
        otherwise({redirectTo: '/login'});
    }]);
  // .run ($rootScope, $location, User) ->
  //   $rootScope.$on '$routeChangeStart', (event, next, current) ->
  //       if not User.isAuthenticated() and next.templateUrl isnt '/partials/login.html'
  //           $location.path("/login");
