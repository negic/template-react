(function() {
  var $, MovingState,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('jquery');

  MovingState = (function() {
    MovingState.prototype.defaultOptions = {
      el: window,
      delay: 500,
      event: 'scroll'
    };

    function MovingState(opt) {
      this.onMoving = __bind(this.onMoving, this);
      this.opt = $.extend({}, this.defaultOptions, opt);
      $(this.opt.el).on(this.opt.event, this.onMoving);
    }

    MovingState.prototype.state = 0;

    MovingState.prototype.onMoving = function(events) {
      var _base, _base1;
      this.state = this.state === 0 ? 1 : this.state === 1 ? 2 : this.state;
      if (this.state === 1) {
        if (typeof (_base = this.opt).start === "function") {
          _base.start();
        }
      }
      if (this.timeId) {
        if (typeof (_base1 = this.opt).move === "function") {
          _base1.move();
        }
        clearTimeout(this.timeId);
      }
      return this.timeId = setTimeout((function(_this) {
        return function() {
          var _base2;
          _this.state = 0;
          return typeof (_base2 = _this.opt).ended === "function" ? _base2.ended() : void 0;
        };
      })(this), this.opt.delay);
    };

    return MovingState;

  })();

  module.exports = MovingState;

}).call(this);
