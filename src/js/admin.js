var angular = require('angular');
require('angular-bootstrap');

var SITE_URL = '/* @echo SITE_URL */' || '//' + window.location.hostname;

var adminMethod = function (method) {
  return function ($scope, $http) {
    this.alerts = [];
    var self = this;
    this.post = function (data) {
      $http({
        data: data,
        method: 'POST',
        url: SITE_URL + '/admin/events/' + method
      }).then(function (result) {
        return {
          message: 'Success: ' + result.data.success.message,
          type: 'success'
        };
      }).catch(function (result) {
        return {
          message: 'Error: ' + result.status + ': ' + result.data.error.message,
          type: 'danger'
        };
      }).then(function (log) {
        self.alerts.push(log);
        $scope.loadEvents();
      });
    };
    this.closeAlert = function (index) {
      this.alerts.splice(index, 1);
    };
  };
};

var adminApp = angular.module('adminApp', ['ui.bootstrap']);
adminApp.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.events = [];

  $scope.loadEvents = function () {
    $http.get(SITE_URL + '/api/1/events/list.json').then(function (result) {
      $scope.events = result.data;
    });
  };

  $scope.loadEvents();
}]);
adminApp.controller('addCtrl', ['$scope', '$http', adminMethod('add')]);
adminApp.controller('editCtrl', ['$scope', '$http', adminMethod('edit')]);
adminApp.controller('deleteCtrl', ['$scope', '$http', adminMethod('delete')]);
