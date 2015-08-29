/* eslint-disable no-var, object-shorthand, strict */
/* global angular, moment, window */

moment.locale('ja', {
  weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
  weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
  calendar : {
    sameDay : '[今日]',
    nextDay : '[明日]',
    nextWeek : '[来週] dddd',
    lastDay : '[昨日]',
    lastWeek : '[前週] dddd',
    sameElse : 'YYYY年M月D日（dd）'
  }
});

var SITE_URL = '/* @echo SITE_URL */' || '//' + window.location.hostname;

var kyukouAppFilters = angular.module('kyukouApp.filters', []);

kyukouAppFilters.filter('aboutFilter', [function () {
  return function (events, selectedAbouts) {
    if (!angular.isUndefined(events) && !angular.isUndefined(selectedAbouts) && selectedAbouts.length > 0) {
      var tempEvents = [];
      angular.forEach(selectedAbouts, function (about) {
        angular.forEach(events, function (event) {
          if (angular.equals(event.about, about)) {
            tempEvents.push(event);
          }
        });
      });
      return tempEvents;
    } else {
      return events;
    }
  };
}]);

kyukouAppFilters.filter('departmentFilter', [function () {
  return function (events, selectedDepartments) {
    if (!angular.isUndefined(events) && !angular.isUndefined(selectedDepartments) && selectedDepartments.length > 0) {
      var tempEvents = [];
      angular.forEach(selectedDepartments, function (department) {
        angular.forEach(events, function (event) {
          if (angular.equals(event.department[0], department[0])) {
            tempEvents.push(event);
          }
        });
      });
      return tempEvents;
    } else {
      return events;
    }
  };
}]);

var kyukouApp = angular.module('kyukouApp', ['kyukouApp.filters', 'ui.bootstrap', 'LocalStorageModule']);

kyukouApp.factory('eventList', ['$http', '$q', function ($http, $q) {
  var deferred = $q.defer();
  $http.get(SITE_URL + '/api/1/events/list.json').then(function (result) {
    var eventsObj = {};
    result.data.forEach(function (event) {
      event.raw = event.raw.replace(/\s+/g, ' ');
      // datetime
      event.eventDate = moment(event.eventDate).utcOffset(540);
      event.dateformatted = event.eventDate.calendar();
      if (event.note || event.campus || event.note) {
        event.hasNote = true;
      }
      // push to eventsObj
      var time = event.eventDate.valueOf();
      if (!eventsObj[time]) {
        eventsObj[time] = [];
      }
      eventsObj[time].push(event);
    });
    var events = Object.keys(eventsObj).sort().map(function (key) {
      return {
        data: eventsObj[key],
        date: eventsObj[key][0].dateformatted
      }
    })
    deferred.resolve({
      events: events,
      eventsCount: result.data.length
    });
  }, function (err) {
    deferred.reject(err);
  });
  return deferred.promise;
}]);

kyukouApp.service('defaults', function () {
  this.departments = ['教育学部', '文学部', '法学部', '理学部', '経済学部'];
  this.abouts = ['休講', '補講', '連絡', '教室変更', 'その他', '公務'];
});

kyukouApp.controller('eventListCtrl', ['$scope', 'eventList', 'defaults', 'localStorageService', function ($scope, eventList, defaults, localStorageService) {
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isCollapsed = true;

  $scope.ctrlTmpl = 'kyukou-loading';
  $scope.error = null;

  $scope.eventsCount = 0;
  $scope.filteredEvents = [];
  $scope.filteredCount = function () {
    return $scope.filteredEvents.reduce(function (count, el) {
      return count + el.length;
    }, 0);
  };
  eventList.then(function (data) {
    $scope.events = data.events;
    $scope.eventsCount = data.eventsCount;
    $scope.ctrlTmpl = 'kyukou-app';
    $scope.error = null;
  }, function (err) {
    $scope.error = {
      status: err.status
    };
  });

  $scope.departments = defaults.departments;
  if (!localStorageService.get('selectedDepartments') || localStorageService.get('selectedDepartments').length === 0) {
    localStorageService.set('selectedDepartments', defaults.departments);
  }
  localStorageService.bind($scope, 'selectedDepartments');

  $scope.abouts = defaults.abouts;
  if (!localStorageService.get('selectedAbouts') || localStorageService.get('selectedAbouts').length === 0) {
    localStorageService.set('selectedAbouts', defaults.abouts);
  }
  localStorageService.bind($scope, 'selectedAbouts');
}]);
