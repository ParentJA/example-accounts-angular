(function (window, angular, undefined) {

  "use strict";

  function signUp() {
    return {
      restrict: "A",
      template: "" +
      "<form ng-submit='signUp()'>" +
      "<input type='text' placeholder='username' ng-model='username' required>" +
      "<input type='text' placeholder='email' ng-model='email' required>" +
      "<input type='password' placeholder='password' ng-model='password' required>" +
      "<button type='submit'>Submit</button>" +
      "</form>",
      scope: {},
      controller: "SignUpController"
    };
  }

  function SignUpController($scope, loadAllService, signUpService) {
    $scope.username = null;
    $scope.email = null;
    $scope.password = null;

    $scope.signUp = function signUp() {
      signUpService($scope.username, $scope.email, $scope.password).then(loadAllService);
    };
  }

  angular.module("example-accounts")
    .directive("signUp", [signUp])
    .controller("SignUpController", ["$scope", "loadAllService", "signUpService", SignUpController]);

})(window, window.angular);