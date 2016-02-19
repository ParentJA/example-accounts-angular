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