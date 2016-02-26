(function (window, angular, undefined) {

  "use strict";

  angular.module("example-accounts", ["ngCookies"]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function AccountModel($cookies, USER_COOKIE_KEY) {
    this.clear = function clear() {
      $cookies.remove(USER_COOKIE_KEY);
    };

    this.getUser = function getUser() {
      var user = $cookies.get(USER_COOKIE_KEY);
      return angular.isUndefined(user) ? undefined : JSON.parse(user);
    };

    this.hasUser = function hasUser() {
      var user = $cookies.get(USER_COOKIE_KEY);
      return angular.isDefined(user);
    };

    this.update = function update(dict) {
      $cookies.put(USER_COOKIE_KEY, JSON.stringify(dict));
    };
  }

  angular.module("example-accounts")
    .constant("USER_COOKIE_KEY", "example.user")
    .service("AccountModel", ["$cookies", "USER_COOKIE_KEY", AccountModel]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function logInService($http, $q, BASE_URL, AccountModel) {
    return function (username, password) {
      var deferred = $q.defer();
      $http.post(BASE_URL + "accounts/log_in/", {
        username: username,
        password: password
      }).then(function (response) {
        AccountModel.update(response.data);
        deferred.resolve(AccountModel);
      }, function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };
  }

  angular.module("example-accounts")
    .factory("logInService", ["$http", "$q", "BASE_URL", "AccountModel", logInService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function logOutService($http, $q, BASE_URL, AccountModel) {
    return function () {
      var deferred = $q.defer();
      $http.post(BASE_URL + "accounts/log_out/").finally(function () {
        AccountModel.clear();
        deferred.resolve(AccountModel);
      });
      return deferred.promise;
    };
  }

  angular.module("example-accounts")
    .factory("logOutService", ["$http", "$q", "BASE_URL", "AccountModel", logOutService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function signUpService($http, $q, BASE_URL, AccountModel) {
    return function (username, email, password) {
      var deferred = $q.defer();
      $http.post(BASE_URL + "accounts/sign_up/", {
        username: username,
        email: email,
        password: password
      }).then(function (response) {
        AccountModel.update(response.data);
        deferred.resolve(AccountModel);
      }, function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };
  }

  angular.module("example-accounts")
    .factory("signUpService", ["$http", "$q", "BASE_URL", "AccountModel", signUpService]);

})(window, window.angular);
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

  function SignUpController($scope, signUpService) {
    $scope.username = null;
    $scope.email = null;
    $scope.password = null;

    $scope.signUp = function signUp() {
      return signUpService($scope.username, $scope.email, $scope.password);
    };
  }

  angular.module("example-accounts")
    .directive("signUp", [signUp])
    .controller("SignUpController", ["$scope", "signUpService", SignUpController]);

})(window, window.angular);