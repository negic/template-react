(function() {
  var $, TapStyle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('jquery');

  TapStyle = (function() {
    TapStyle.prototype.defaults = {
      delegate: '',
      className: 'tap-style',
      el: '#wrapper'
    };

    function TapStyle(opt) {
      this.eventHandler = __bind(this.eventHandler, this);
      this.className = !opt.className ? this.defaults.className : void 0;
      $(opt.el).on('touchstart touchend', opt.delegate, this.eventHandler);
    }

    TapStyle.prototype.eventHandler = function(e) {
      var el;
      el = $(e.currentTarget);
      if (e.type === 'touchstart') {
        return el.addClass(this.className);
      } else if (e.type === 'touchend') {
        return el.removeClass(this.className);
      }
    };

    return TapStyle;

  })();

  module.exports = TapStyle;

}).call(this);
