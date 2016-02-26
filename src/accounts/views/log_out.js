(function (window, angular, undefined) {

  "use strict";

  function logOut() {
    return {
      restrict: "A",
      template: "<button type='button' ng-click='logOut()'>Log out</button>",
      scope: {},
      controller: "LogOutController"
    };
  }

  function LogOutController($scope, logOutService) {
    $scope.logOut = function logOut() {
      return logOutService();
    };
  }

  angular.module("example-accounts")
    .directive("logOut", [logOut])
    .controller("LogOutController", ["$scope", "logOutService", LogOutController]);

})(window, window.angular);