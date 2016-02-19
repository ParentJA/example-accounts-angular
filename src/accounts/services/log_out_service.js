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