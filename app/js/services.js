'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
 // value('version', '0.1');


angular.module('acServices', ['ngResource']).
  factory('Collab', function($resource) { 
    return $resource(localStorage.api_url + '?path_info=:path&format=json&auth_api_token=:key'); }).
  value('version', '0.1');


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

