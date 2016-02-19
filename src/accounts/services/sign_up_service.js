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