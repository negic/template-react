(function() {
  var $, Anchor,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('jquery');

  Anchor = (function() {
    Anchor.prototype.defaults = {
      delegate: '',
      speed: 500,
      extra: 0,
      easing: 'swing'
    };

    function Anchor(opt) {
      this.eventHandler = __bind(this.eventHandler, this);
      this.speed = !opt.className ? this.defaults.speed : void 0;
      this.extra = !opt.className ? this.defaults.extra : void 0;
      this.easing = !opt.className ? this.defaults.easing : void 0;
      $('#wrapper').on('click', opt.delegate, this.eventHandler);
    }

    Anchor.prototype.eventHandler = function(e) {
      e.preventDefault();
      return $('html, body').stop(true, false).animate({
        scrollTop: $($(e.target).attr('href')).offset().top + this.extra
      }, this.speed, this.easing);
    };

    return Anchor;

  })();

  module.exports = Anchor;

}).call(this);
