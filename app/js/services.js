'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
 // value('version', '0.1');


angular.module('acServices', ['ngResource']).
  factory('Collab', function($resource, api_url, api_key)
  {
    return $resource(api_url + '?path_info=:path&format=json&auth_api_token=' + api_key, {}, 
    {
      query: {method:'GET', params:{path:'projects'}, isArray:true
    }
  });
}).
  value('version', '0.1').
  value('api_url', '').
  value('api_key', '');
/*
factory('Collab', function($resource, api_url, api_key)
  {
    var loadData, localdata;
    localdata = {};
    loadData = function() 
    {
      var loaded;
      loaded = window.localStorage.getItem($resource.path);
      if (!loaded) 
      {
        return $resource(api_url + '?path_info=:path&format=json&auth_api_token=' + api_key, {}, 
                   { query: { method:'GET', params:{path:'projects'}, isArray:true } });
        
        angular.extend(localdata, returnVal);
        return window.localStorage.setItem($resource.path, JSON.stringify(returnVal));
      }
      else
      {
        return angular.extend(localdata, JSON.parse(loaded));
      }
    };
  
    loadData();

    return {
      data: localdata
    };*/