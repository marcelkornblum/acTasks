'use strict';

angular.module('acTasks', ['acServices', 'acFilters', 'acDirectives', 'Auth', 'ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'partials/login.html',   controller: AuthCtrl}).
        when('/combined', {templateUrl: 'partials/combined.html',   controller: CombinedListCtrl}).
        otherwise({redirectTo: '/combined'});
    }]);
