(function() {
  var utils;

  utils = {
    getDigits: function(num, base) {
      if (base == null) {
        base = 10;
      }
      return Math.log(num) / Math.log(base) + 1 | 0;
    },
    getUrlVars: function() {
      var i, key, keySearch, param, val, vars;
      vars = {};
      param = location.search.substring(1).split("&");
      i = 0;
      while (i < param.length) {
        keySearch = param[i].search(RegExp("="));
        key = "";
        if (keySearch !== -1) {
          key = param[i].slice(0, keySearch);
        }
        val = param[i].slice(param[i].indexOf("=", 0) + 1);
        if (key !== "") {
          vars[key] = decodeURI(val);
        }
        i++;
      }
      return vars;
    },
    mb_strwidth: function(str) {
      var c, i, l, length;
      i = 0;
      l = str.length;
      c = "";
      length = 0;
      while (i < l) {
        c = str.charCodeAt(i);
        if (0x0000 <= c && c <= 0x0019) {
          length += 0;
        } else if (0x0020 <= c && c <= 0x1fff) {
          length += 1;
        } else if (0x2000 <= c && c <= 0xff60) {
          length += 2;
        } else if (0xff61 <= c && c <= 0xff9f) {
          length += 1;
        } else {
          if (0xffa0 <= c) {
            length += 2;
          }
        }
        i++;
      }
      return length;
    },
    mb_strimwidth: function(str, start, width, trimmarker) {
      var c, charCode, charWidth, i, l, next, nextWidth, trimmakerWidth, trimmedLength, trimmedStr;
      if (typeof trimmarker === "undefined") {
        trimmarker = "";
      }
      trimmakerWidth = mb_strwidth(trimmarker);
      i = start;
      l = str.length;
      trimmedLength = 0;
      trimmedStr = "";
      while (i < l) {
        charCode = str.charCodeAt(i);
        c = str.charAt(i);
        charWidth = mb_strwidth(c);
        next = str.charAt(i + 1);
        nextWidth = mb_strwidth(next);
        trimmedLength += charWidth;
        trimmedStr += c;
        if (trimmedLength + trimmakerWidth + nextWidth > width) {
          trimmedStr += trimmarker;
          break;
        }
        i++;
      }
      return trimmedStr;
    },
    historyBack: (function(_this) {
      return function(event) {
        event.preventDefault();
        return history.back();
      };
    })(this),
    getUnixTime: function() {
      return parseInt((new Date) / 1000);
    }
  };

  module.exports = utils;

}).call(this);
