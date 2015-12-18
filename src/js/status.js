var angular = require('angular');
require('angular-animate');
require('angular-bootstrap');

var SITE_URL = '/* @echo SITE_URL */' || '//' + window.location.hostname;

var logApp = angular.module('statusApp', ['ui.bootstrap', 'ngAnimate']);
logApp.factory('logList', ['$http', '$q', function ($http, $q) {
  return $q.all([
    '/api/1/logs/task.json',
    '/api/1/logs/twit_new.json',
    '/api/1/logs/twit_tomorrow.json',
    '/api/1/logs/delete.json'
  ].map(function (path) {
    return $http.get(SITE_URL + path);
  })).then(function (results) {
    return results.map(function (result) {
      var data = result.data;
      data.time = new Date(data.time).toString();
      data.isFailure = data.level !== 1;
      data.level = ['', 'success', 'info', 'warning', 'danger'][data.level];
      return data;
    });
  });
}]);
logApp.controller('logListCtrl', ['logList', function (logList) {
  this.ctrlTmpl = 'logapp-loading';
  this.oneAtATime = false;
  this.logs = null;
  this.error = null;

  var self = this;
  logList.then(function (data) {
    self.logs = data;
    self.ctrlTmpl = 'logapp';
    self.error = null;
  }, function (err) {
    self.error = err;
  });
}]);
