(function() {
  var Preloader,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Preloader = (function() {
    Preloader.prototype.WORKER_JS_FILE = "";

    Preloader.prototype.count = 0;

    function Preloader(callbacks) {
      this.end = __bind(this.end, this);
      this.progress = __bind(this.progress, this);
      this.loadComplete = __bind(this.loadComplete, this);
      this.loadPreload = __bind(this.loadPreload, this);
      this.workerHandler = __bind(this.workerHandler, this);
      this.loadWorker = __bind(this.loadWorker, this);
      this.start = __bind(this.start, this);
      this.callbacks = callbacks;
      this.enableWorker = !!window.Worker;
    }

    Preloader.prototype.start = function(urls) {
      this.total = urls.length;
      if (this.enableWorker) {
        return this.loadWorker(urls);
      } else {
        return this.loadPreload(urls);
      }
    };

    Preloader.prototype.loadWorker = function(urls) {
      this.worker = new Worker(this.WORKER_JS_FILE);
      this.worker.onmessage = this.workerHandler;
      return this.worker.postMessage(urls);
    };

    Preloader.prototype.workerHandler = function(e) {
      switch (e.data.progress) {
        case "end":
          this.worker.terminate();
          return this.loadComplete();
        case "next":
          return this.loadComplete(e.data.url);
      }
    };

    Preloader.prototype.loadPreload = function(urls) {
      var load, url, _i, _len, _results;
      load = (function(_this) {
        return function(url) {
          var xhr;
          xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
              return _this.loadComplete(xhr.responseURL);
            }
          };
          xhr.open("GET", url, false);
          return xhr.send(null);
        };
      })(this);
      _results = [];
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        url = urls[_i];
        _results.push(load(url));
      }
      return _results;
    };

    Preloader.prototype.loadComplete = function(url) {
      this.count++;
      if (this.count > this.total) {
        return this.end();
      } else {
        return this.progress(url);
      }
    };

    Preloader.prototype.progress = function(url) {
      var _base;
      return typeof (_base = this.callbacks).progress === "function" ? _base.progress(this.count) : void 0;
    };

    Preloader.prototype.end = function() {
      var _base;
      return typeof (_base = this.callbacks).end === "function" ? _base.end() : void 0;
    };

    return Preloader;

  })();

  module.exports = Preloader;

}).call(this);
