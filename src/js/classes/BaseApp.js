(function() {
  var $, BaseApp, MovingState, Singleton,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  $ = require('jquery');

  Singleton = require('./Singleton');

  MovingState = require('./MovingState');

  BaseApp = (function(_super) {
    __extends(BaseApp, _super);

    BaseApp.prototype.fps = 30;

    BaseApp.prototype.isScroll = false;

    function BaseApp(_at_num) {
      this.num = _at_num;
      this.onScroll = __bind(this.onScroll, this);
      this.onResize = __bind(this.onResize, this);
      this.getScroll = __bind(this.getScroll, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getWidth = __bind(this.getWidth, this);
      this.setFrameRate = __bind(this.setFrameRate, this);
      this.getFrameRate = __bind(this.getFrameRate, this);
      this.frameRate = 1000 / this.fps;
      $(window).on('resize', this.onResize);
      new MovingState({
        event: 'scroll',
        delay: 50,
        start: (function(_this) {
          return function() {
            _this.isScroll = true;
            return _this.onScroll();
          };
        })(this),
        ended: (function(_this) {
          return function() {
            return _this.isScroll = false;
          };
        })(this)
      });
      this.onResize();
    }

    BaseApp.prototype.getFrameRate = function() {
      return Math.floor(this.frameRate);
    };

    BaseApp.prototype.setFrameRate = function(fps) {
      this.fps = fps;
      return this.frameRate = 1000 / this.fps;
    };

    BaseApp.prototype.getWidth = function() {
      return this.width;
    };

    BaseApp.prototype.getHeight = function() {
      return this.height;
    };

    BaseApp.prototype.getScroll = function() {
      return {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft
      };
    };

    BaseApp.prototype.onResize = function() {
      this.width = document.documentElement.clientWidth || window.innerWidth;
      return this.height = document.documentElement.clientHeight || window.innerHeight;
    };

    BaseApp.prototype.onScroll = function() {
      if (!this.isScroll) {
        return false;
      }
      return setTimeout(this.onScroll, this.frameRate);
    };

    return BaseApp;

  })(Singleton);

  module.exports = BaseApp;

}).call(this);
