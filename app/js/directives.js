'use strict';

/* Directives */


angular.module('acDirectives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('acLink', function(item) {
  	return {
        restrict: 'E',
	    replace: true,
	    transclude: true,
  		template: '<a href="{{item.permalink}}"><span class="ac-icon"></span></a>'
  	};
  }).
  directive('taskListItem', function() {
  	return {
        restrict: 'E',
	    replace: true,
	    transclude: true,
  		template: '<a ng:click="selecttask(task)" class="name"><task-priority-box task="task"></task-priority-box> <task-assignee-box task="task"></task-assignee-box> {{task.name}} <task-label-box task="task"></task-label-box> <task-category-box task="task"></task-category-box></a>'
  	};
  }).
  directive('taskPriorityBox', function() {
  	return {
        restrict: 'E',
	    transclude: true,
	    link: function (scope, element, attrs) {
	    	element.html('<a ui-jq="tooltip" ui-options="{placement:\'right\'}" ng:click="changepriority(task)" class="badge priority-' + scope.task.priorityName + '" title="Priority: ' + scope.task.priorityName + '"><i class="icon-priority-' + scope.task.priorityName + '"></i></a>');
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
	    			element.html('<a ui-jq="tooltip" ng:click="changelabel(task)" class="label pull-right" title="Label: ' + scope.label.name + '" style="background-color: ' + scope.label.bg_color + '; color: ' + scope.label.fg_color + ';">' + scope.label.name + '</a>');
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
	    			element.html('<a ui-jq="tooltip" ng:click="changecategory(task)" class="label" title="Category: ' + scope.category.name + '">' + scope.category.name + '</a>');
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
	    			element.html('<a ui-jq="tooltip" ng:click="changeassignee(task)" class="label label-inverse" title="Assignee: ' + scope.assignee.name + '">' + scope.assignee.initials + '</a>');
	    		}
	    		return newValue;
	    	}, true);
	    },
  	};
  });