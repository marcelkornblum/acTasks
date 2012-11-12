'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
 // value('version', '0.1');

var acServices = angular.module('acServices', ['ngResource']);

function processAcList(Type) {
  return function(response) {
    var list = [];
    angular.forEach(response.data, function(data) {

        //get slug
        var pieces = data.permalink.split('/');
        data.slug = pieces[pieces.length - 1];

        data.created_on = data.created_on ? data.created_on.formatted_date : null;
        data.updated_on = data.updated_on ? data.updated_on.formatted_date : null;

        //mark as processed
        data.processed = true;
        console.log(data);

      list.push(new Type(data));
    });
    return list;
  }
}

function processDropdown(Type) {
  return function(response) {
    var list = [{"id":"", "name":"ALL"}];
    angular.forEach(response.data, function(data) {
      list.push(new Type(data));
    });
    return list;
  }
}

acServices.factory('Projects', function($http) {
  var data = Array();
  var Projects = function(data) {
      angular.copy(data, this);
    };
  Projects.query = function() {
    if (!data['list']) {
      data['list'] = $http.get(localStorage.api_url + '?path_info=projects&format=json&auth_api_token=' + localStorage.api_key).then(processAcList(Projects));
    }
    return data['list'];
  }
  Projects.get = function(projectSlug) {
    if(!data || !data[projectSlug]) {
      data[projectSlug] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '&format=json&auth_api_token=' + localStorage.api_key);//.then(processProjects(Projects));
    }
    return data[projectSlug];
  }
  // Put other business logic on Phone here
  return Projects;
});



acServices.factory('Tasks', function($http) { 
  var data = Array();
  var Tasks = function(data) {
      angular.copy(data, this);
    };
  Tasks.query = function(projectSlug) {
    if (!data[projectSlug]) {
      data[projectSlug] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks&format=json&auth_api_token=' + localStorage.api_key).then(processAcList(Tasks));
    }
    console.log(data[projectSlug]);
    return data[projectSlug];
  }
  Tasks.get = function(projectSlug, taskId) {
    if(!data || !data[projectSlug + '-' + taskId]) {
      data[projectSlug + '-' + taskId] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + taskId + '&format=json&auth_api_token=' + localStorage.api_key);//.then(processTasks(Tasks));
    }
    return data[projectSlug + '-' + taskId];
  }
  // Put other business logic on Phone here
  return Tasks;
});


acServices.factory('Labels', function($http) { 
  var data;
  var Labels = function(data) {
      angular.copy(data, this);
    };
  Labels.query = function() {
    if (!data)
    {
      data = $http.get(localStorage.api_url + '?path_info=info/labels/project&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Labels));
    }
    return data;
  }
  return Labels;
});


acServices.factory('Categories', function($http) { 
  var data;
  var Categories = function(data) {
      angular.copy(data, this);
    };
  Categories.query = function() {
    if (!data)
    {
      data = $http.get(localStorage.api_url + '?path_info=projects/categories&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Categories));
    }
    return data;
  }
  return Categories;
  });



acServices.value('version', '0.1');


var Auth = angular.module('Auth', []);
Auth.factory('Auth', function() {
  Auth = {
    api_url: localStorage.api_url,
    api_key: localStorage.api_key,
    tested: localStorage.tested,
    save: function(api_url, api_key) {
      if (localStorage.tested)
      {
        localStorage.api_url = api_url
        localStorage.api_key = api_key
      }
      else
      {
        localStorage.removeItem('api_url')
        localStorage.removeItem('api_key')
        alert('API URL/Key pair untested - test and try again');
      }
    },
    logout: function() {
      localStorage.removeItem('api_url')
      localStorage.removeItem('api_key')
      localStorage.removeItem('tested')
      delete this.api_url
      delete this.api_key
      delete this.tested
      this.loggedIn = false
    },
    test: function(api_url, api_key, $http) {
      var testString = api_url + '?path_info=info&format=json&auth_api_token=' + api_key;
      $http({method: 'GET', url: testString}).
      success(function(data, status, $scope) {
            // $scope.status = status;
            // $scope.data = data;
            localStorage.api_url = api_url
            localStorage.api_key = api_key
            localStorage.tested = true
            alert('API URL/Key pair successfully connected');
          }).
      error(function(data, status) {
            // $scope.data = data || "Request failed";
            // $scope.status = status;
            localStorage.removeItem('api_url')
            localStorage.removeItem('api_key')
            localStorage.tested = false
            alert('API URL/Key pair could not be used to connect');
          });

    }
  }
  Auth.loggedIn = Auth.tested
  return Auth
})

