'use strict';

/* Filters */

angular.module('acFilters', []).
  filter('projectdetaillink', function() {
    return function(text) {
      var pieces = text.split('/');
	  return '#/projects/' + pieces[pieces.length - 1];
    }
  }
).
  filter('projectoverviewlink', function() {
    return function(text) {
      var pieces = text.split('/');
	  return '#/projects/' + pieces[pieces.length - 1] + '/overview';
    }
  }
);