'use strict';

/* Services */

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

        if (data.label)
        {
          data.label_id = data.label.id;
          data.label = data.label.name;
        }

        if (data.body)
        {
          var tmp = document.createElement("DIV");
          tmp.innerHTML = data.body;
          data.body =  tmp.textContent||tmp.innerText;
        }

        if (data.priority != undefined)
        {
          switch (data.priority)
          {
            case 2:
              data.priorityName = 'TOP';
              break;
            case 1:
              data.priorityName = 'HIGH';
              break;
            case 0:
              data.priorityName = 'NONE';
              break;
            case -1:
              data.priorityName = 'LOW';
              break;
            case -2:
              data.priorityName = 'BOTTOM';
              break;
          }
        }

        //mark as processed
        data.processed = true;
       // console.log(data);

      list.push(new Type(data));
    });
    return list;
  }
}

function processUsers(Type) {
  return function(response) {
    var list = [];
    angular.forEach(response.data, function(data) {
      var user = data.user;
      user.role = data.role;
      user.role_id = data.role_id;
      user.permissions = data.permissions;
      user.initials = user.first_name[0] + user.last_name[0];

      var pieces = user.permalink.split('/');
      user.slug = pieces[pieces.length - 1];

      list.push(new Type(user));
    });
    return list;
  }
}

function processUser(Type) {
  return function(response) {
    var user;
    angular.forEach(response.data, function(data) {
      user = response.data.logged_user;
      user.role_id = data.role_id;
      user.initials = user.first_name[0] + user.last_name[0];

      var pieces = user.permalink.split('/');
      user.slug = pieces[pieces.length - 1];
      
      user = new Type(user);
    });
    return user;
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

function assocArrayId(Type) {
  return function(response) {
    var list = Array();
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
    return data[projectSlug];
  }
  Tasks.get = function(projectSlug, taskId) {
    if(!data || !data[projectSlug + '-' + taskId]) {
      data[projectSlug + '-' + taskId] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + taskId + '&format=json&auth_api_token=' + localStorage.api_key);//.then(processTasks(Tasks));
    }
    return data[projectSlug + '-' + taskId];
  }
  return Tasks;
});


acServices.factory('Labels', function($http) { 
  var data = Array();
  var Labels = function(data) {
      angular.copy(data, this);
    };
  Labels.query = function() {
    if (!data['projects'])
    {
      data['projects'] = $http.get(localStorage.api_url + '?path_info=info/labels/project&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Labels));
    }
    return data['projects'];
  };
  Labels.taskQuery = function() {
    if (!data['tasks'])
    {
      data['tasks'] = $http.get(localStorage.api_url + '?path_info=info/labels/assignment&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Labels));
    }
    return data['tasks'];
  }
  return Labels;
});


acServices.factory('Categories', function($http) { 
  var data = Array();
  var Categories = function(data) {
      angular.copy(data, this);
    };
  Categories.query = function() {
    if (!data['projects'])
    {
      data['projects'] = $http.get(localStorage.api_url + '?path_info=projects/categories&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Categories));
    }
    return data['projects'];
  };
  Categories.taskQuery = function(projectSlug) {
    if (!data[projectSlug])
    {
      data[projectSlug] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/categories&format=json&auth_api_token=' + localStorage.api_key).then(processDropdown(Categories));
    }
    return data[projectSlug];
  }
  return Categories;
  });



acServices.factory('People', function($http) {
  var data = Array();
  var People = function(data) {
      angular.copy(data, this);
    };
  People.query = function(projectSlug) {
    if (!data[projectSlug]) {
      data[projectSlug] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/people&format=json&auth_api_token=' + localStorage.api_key).then(processUsers(People));
    }
    return data[projectSlug];
  };
  People.me = function() {
    if (!data['me']) {
      data['me'] = $http.get(localStorage.api_url + '?path_info=info&format=json&auth_api_token=' + localStorage.api_key).then(processUser(People));
    }
    return data['me'];
  }
  return People;
});



acServices.value('version', '0.2');


var Auth = angular.module('Auth', []);
Auth.factory('Auth', function() {
  Auth = {
    api_url: localStorage.api_url,
    api_key: localStorage.api_key,
    tested: localStorage.tested,
    login: function(api_url, email, password) {
      console.log(api_url)
      console.log(email)
      console.log(password)
      console.log(Auth.client_name)
      // var params = {'api_subscription[email]': email, 'api_subscription[password]': password, 'api_subscription[client_name]': Auth.client_name, 'api_subscription[client_vendor]': Auth.client_vendor}
      // var keyString = api_url + '?api_subscription[email]=' + email + '&api_subscription[password]=' + password + '&api_subscription[client_name]=' + Auth.client_name + '&api_subscription[client_vendor]=' + Auth.client_vendor; 
      // var data = $http({method: 'POST', url: keyString});
      jQuery.ajax({
        url: api_url,
        data: "api_subscription[email]=" + email + "&api_subscription[password]=" + password + "&api_subscription[client_name]=" + Auth.client_name + "&api_subscription[client_vendor]=" + Auth.client_vendor,
        type: "POST"})
      console.log(data);
    },
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

