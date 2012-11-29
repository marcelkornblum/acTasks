'use strict';

angular.module('acTasks', ['acServices', 'acFilters', 'acDirectives', 'Auth', 'ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'partials/login.html',   controller: AuthCtrl}).
        when('/combined', {templateUrl: 'partials/combined.html',   controller: CombinedListCtrl}).
        // when('/projects', {templateUrl: 'partials/project-list.html',   controller: ProjectListCtrl}).
        // when('/projects/:projectSlug', {templateUrl: 'partials/project-detail.html', controller: ProjectDetailCtrl}).
        // when('/projects/:projectSlug/overview', {templateUrl: 'partials/project-overview.html',   controller: ProjectOverviewCtrl}).
        // when('/projects/:projectSlug/tasks', {templateUrl: 'partials/task-list.html',   controller: TaskListCtrl}).
        // when('/projects/:projectSlug/tasks/:taskId', {templateUrl: 'partials/task-detail.html', controller: TaskDetailCtrl}).
        otherwise({redirectTo: '/login'});
    }]);
