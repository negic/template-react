(function() {
  var Singleton;

  Singleton = (function() {
    function Singleton() {}

    Singleton._instance = null;

    Singleton.getInstance = function() {
      return this._instance || (this._instance = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this, arguments, function(){}));
    };

    return Singleton;

  })();

  module.exports = Singleton;

}).call(this);
