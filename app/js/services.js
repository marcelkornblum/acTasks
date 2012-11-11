'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
 // value('version', '0.1');

var acServices = angular.module('acServices', ['ngResource']);

acServices.factory('Projects', function($resource) { 
  var data;
  var resource = $resource(localStorage.api_url + '?path_info=projects&format=json&auth_api_token=' + localStorage.api_key); 

  var results = function() {
    if(!data) {
      data = resource.query();
    }
    return processProjects();
  }

  var processProjects = function() {
    if (data.length > 0 && data[0].processed != true)
    {
      for (var i=0; i<data.length; i++)
      {
        var pieces = data[i].urls.view.split('/');
        data[i].slug = pieces[pieces.length - 1];
        data[i].processed = true;
      }
    }
    return data;
  }

  return {
    query: function() {
      return results(); 
    }
  };
});


acServices.factory('Project', function($resource) { 
  var data = Array();
  var resource = $resource(localStorage.api_url + '?path_info=projects/:projectSlug&format=json&auth_api_token=' + localStorage.api_key); 
  //return resource;

  var results = function(obj) {
    if(!data[obj.projectSlug]) {
      data[obj.projectSlug] = resource.query(obj);
    }
    return data[obj.projectSlug];
  }

  return {
    get: function(obj) {
      return results(obj); 
    }
  };

});


acServices.factory('Tasks', function($resource) { 
  var data;
  var resource = $resource(localStorage.api_url + '?path_info=projects/:projectSlug/tasks&format=json&auth_api_token=' + localStorage.api_key); 

  var results = function() {
    if(!data) {
      data = resource.query();
    }
    return data;
  }

  return {
    query: function() {
      return results(); 
    }
  };
});


acServices.factory('Task', function($resource) { 
  var data = Array();
  var resource = $resource(localStorage.api_url + '?path_info=projects/:projectSlug/tasks/:taskId&format=json&auth_api_token=' + localStorage.api_key); 

  var results = function(obj) {
    if(!data[obj.projectSlug]) {
      data[obj.projectSlug] = resource.query(obj);
    }
    return data[obj.projectSlug];
  }

  return {
    get: function(obj) {
      return results(obj); 
    }
  };
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

