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

  function LogOutController($scope, FriendModel, logOutService) {
    $scope.logOut = function logOut() {
      logOutService().then(function () {
        FriendModel.clear();
      });
    };
  }

  angular.module("example-accounts")
    .directive("logOut", [logOut])
    .controller("LogOutController", ["$scope", "FriendModel", "logOutService", LogOutController]);

})(window, window.angular);