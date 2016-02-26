(function (window, angular, undefined) {

  "use strict";

  function logIn() {
    return {
      restrict: "A",
      template: "" +
      "<form ng-submit='logIn()'>" +
      "<input type='text' ng-model='username' required>" +
      "<input type='password' ng-model='password' required>" +
      "<button type='submit'>Submit</button>" +
      "</form>",
      scope: {},
      controller: "LogInController"
    };
  }

  function LogInController($scope, logInService) {
    $scope.username = null;
    $scope.password = null;

    $scope.logIn = function logIn() {
      return logInService($scope.username, $scope.password);
    };
  }

  angular.module("example-accounts")
    .directive("logIn", [logIn])
    .controller("LogInController", ["$scope", "logInService", LogInController]);

})(window, window.angular);