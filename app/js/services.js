'use strict';

/* Services */

var acServices = angular.module('acServices', ['ngResource']);

function processAcList(Type) {
  return function(response) {
    var list = [];
    angular.forEach(response.data, function(data) {
      data = processACUnit(data);
      list.push(new Type(data));
    });
    return list;
  }
}

function processAcOne(Type) {
  return function(response) {
    angular.forEach(response.data, function(data) {
      return processACUnit(data);
    });
  }
}

function processACUnit(data) {
  if (data != undefined)
  {
    if (data.permalink != undefined) 
    {
      //get slug
      var pieces = data.permalink.split('/');
      data.slug = pieces[pieces.length - 1];

      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    }

    data.created_on = data.created_on ? data.created_on.formatted_date : null;
    data.updated_on = data.updated_on ? data.updated_on.formatted_date : null;

    if (data.task_id)
    {
      data.id = data.task_id;
    }

    if (data.label)
    {
      data.label_id = data.label.id;
      data.label = data.label.name;
    }

    if (data.body)
    {
      if (!data.body_formatted)
      {
        data.body_formatted = data.body;
      }
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
   console.log(data);
}
return data;
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

function saveAuthData(api_url, Auth) {
  return function(response) {
    var api_key = '';
    if (response.data.substring(0, 8) == 'API key:')
    {
      api_key = response.data.substring(9, response.data.indexOf("\n"));
      console.log(api_key);
      Auth.save(api_url, api_key);
    }
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

function processComments(Type, projectSlug, taskId) {
  return function(response) {
    var list = Array();
    angular.forEach(response.data, function(data) {
      if (data && data.id != undefined){
        var item = Type.getComment(projectSlug, taskId, data.id);
        list.push(item);
      }
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
  Projects.getMilestones = function(projectSlug) {
    if(!data || !data[projectSlug + '-milestones']) {
      data[projectSlug + '-milestones'] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/milestones&format=json&auth_api_token=' + localStorage.api_key);//.then(processProjects(Projects));
    }
    return data[projectSlug + '-milestones'];
  }
  return Projects;
});



acServices.factory('Tasks', function($http) { 
  var data = Array();
  var Tasks = function(data) {
      angular.copy(data, this);
    };
  Tasks.query = function(projectSlug, override) {
    if (override = true) {
      data[projectSlug] = false;
    }
    if (!data[projectSlug]) {
      data[projectSlug] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks&format=json&auth_api_token=' + localStorage.api_key).then(processAcList(Tasks));
    }
    return data[projectSlug];
  }
  Tasks.get = function(projectSlug, taskId, override) {
    if (override = true) {
      data[projectSlug + '-' + taskId] = false;
    }
    if(!data[projectSlug + '-' + taskId]) {
      data[projectSlug + '-' + taskId] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + taskId + '&format=json&auth_api_token=' + localStorage.api_key);//.then(processTasks(Tasks));
    }
    return data[projectSlug + '-' + taskId];
  }
  Tasks.comments = function(projectSlug, taskId, override) {
    if (override = true) {
      data[projectSlug + '-' + taskId + '-comments'] = false;
    }
    if(!data[projectSlug + '-' + taskId + '-comments']) {
      data[projectSlug + '-' + taskId + '-comments'] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + taskId + '/comments&format=json&auth_api_token=' + localStorage.api_key).then(processComments(Tasks, projectSlug, taskId));
    }
    return data[projectSlug + '-' + taskId + '-comments'];
  }
  Tasks.getComment = function(projectSlug, taskId, commentId) {
    if(!data[projectSlug + '-' + taskId + '-comments-' + commentId]) {
      data[projectSlug + '-' + taskId + '-comments-' + commentId] = $http.get(localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + taskId + '/comments/'+ commentId + '&format=json&auth_api_token=' + localStorage.api_key).then(processAcList(Tasks));
    }
    return data[projectSlug + '-' + taskId + '-comments-' + commentId];
  }
  Tasks.put = function(projectSlug, task) {
    var url = localStorage.api_url + '?path_info=projects/' + projectSlug + '/tasks/' + task.id + '/edit&format=json&auth_api_token=' + localStorage.api_key;
    var data = 'submitted=submitted&';
    var headers = 'Content-Type: application/x-www-form-urlencoded';
    for (var key in task) {
      if (key == 'body' || key == 'name' || key == 'priority' || key == 'assignee_id' || key == 'label_id' || key == 'category_id')
      {
        data = data + 'task[' + key + ']=' + encodeURIComponent(task[key]) + '&';
      }
    }
    console.log(url);
    console.log(data);
    console.log(headers);

    return $http({
      method: 'POST',
      url: url,
      data: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}});//.then(acServices.Tasks.query(projectSlug, true));

    //return $http.post(url, data, {'headers': headers});//.then(processTasks(Tasks));
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



acServices.value('version', '0.3');


var Auth = angular.module('Auth', []);
Auth.factory('Auth', function() {
  Auth = {
    api_url: localStorage.api_url,
    api_key: localStorage.api_key,
    tested: localStorage.tested,
    client_name: 'AC FastTasks',
    client_vendor: 'Marcel Kornblum',
    logged: function() {
      if (localStorage.api_key != undefined && localStorage.api_key != '')
      {
        return true;
      }
      return false;
    },
    login: function(email, password, api_url, $http) {
      var config = {'headers': {'Content-Type': 'application/x-www-form-urlencoded'}};
      var data = "api_subscription[email]=" + email + "&api_subscription[password]=" + password + "&api_subscription[client_name]=" + Auth.client_name + "&api_subscription[client_vendor]=" + Auth.client_vendor;
        
      $http.post(api_url, data, config).then(saveAuthData(api_url, Auth, $http), Auth.error(api_url));
    },
    save: function(api_url, api_key, $http) {
      localStorage.api_url = api_url;
      localStorage.api_key = api_key;
      // Auth.test(api_url, api_key, $http);
      $location.path('/combined');
    },
    error: function(api_url, api_key) {
      //
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

