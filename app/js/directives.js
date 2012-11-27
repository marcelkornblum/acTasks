'use strict';

/* Directives */


angular.module('acDirectives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('taskListItem', function() {
  	return {
        restrict: 'E',
	    replace: true,
	    transclude: true,
  		template: '<span><task-priority-box task="task"></task-priority-box><task-assignee-box task="task"></task-assignee-box><a ng:click="selecttask(task)" class="name">{{task.name}}</a><task-label-box task="task"></task-label-box><task-category-box task="task"></task-category-box></span>'
  	};
  }).
  directive('taskPriorityBox', function() {
  	return {
        restrict: 'E',
	    transclude: true,
	    link: function (scope, element, attrs) {
	    	var bgcolor = '#fff';
	    	var char = '';
	    	switch (scope.task.priority) {
	    		case 2:
	    			bgcolor = '#f00';
	    			char = '&raquo;';
	    			break;
	    		case 1:
	    			bgcolor = 'rgb(255, 122, 0);';
	    			char = '&rsaquo;';
	    			break;
	    		case -1:
	    			bgcolor = '#6BBE6B';
	    			char = '&lsaquo;';
	    			break;
	    		case -2:
	    			bgcolor = '#090';
	    			char = '&laquo;';
	    			break;
	    	}
	    	element.html('<a ng:click="changepriority(task)" class="priority" style="background-color: ' + bgcolor + '">' + char + '</a>');
	    },
  	};
  }).
  directive('taskLabelBox', function() {
  	return {
        restrict: 'E',
	    transclude: true,
	    link: function (scope, element, attrs) {
	    	var label;
	    	scope.$watch('tasklabels', function(newValue, oldValue, scope) {
	    		if (newValue !== undefined)
	    		{
	    			for (var i=0; i<newValue.length; i++)
		    		{
		    			if(newValue[i].id == scope.task.label_id)
		    			{
		    				scope.label = newValue[i];
		    				break;
		    			}
		    		}
	    			element.html('<a ng:click="changelabel(task)" class="label" style="background-color: ' + scope.label.bg_color + '">' + scope.label.name + '</a>');
	    		}
	    		return newValue;
	    	}, true);
	    },
  	};
  }).
  directive('taskCategoryBox', function() {
  	return {
        restrict: 'E',
	    transclude: true,
	    link: function (scope, element, attrs) {
	    	var category;
	    	scope.$watch('taskcategories', function(newValue, oldValue, scope) {
	    		if (newValue !== undefined)
	    		{
	    			for (var i=0; i<newValue.length; i++)
		    		{
		    			if(newValue[i].id == scope.task.category_id)
		    			{
		    				scope.category = newValue[i];
		    				break;
		    			}
		    		}
	    			element.html('<a ng:click="changecategory(task)" class="category">' + scope.category.name + '</a>');
	    		}
	    		return newValue;
	    	}, true);
	    },
  	};
  }).
  directive('taskAssigneeBox', function() {
  	return {
        restrict: 'E',
	    transclude: true,
	    link: function (scope, element, attrs) {
	    	var assignee;
	    	scope.$watch('taskpeople', function(newValue, oldValue, scope) {
	    		if (newValue !== undefined)
	    		{
	    			for (var i=0; i<newValue.length; i++)
		    		{
		    			if(newValue[i].id == scope.task.assignee_id)
		    			{
		    				scope.assignee = newValue[i];
		    				break;
		    			}
		    		}
	    			element.html('<a ng:click="changeassignee(task)" class="assignee" >' + scope.assignee.initials + '</a>');
	    		}
	    		return newValue;
	    	}, true);
	    },
  	};
  });