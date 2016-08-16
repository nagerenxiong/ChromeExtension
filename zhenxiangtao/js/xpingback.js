;(function() {
  if (typeof xPingback!== "undefined") {
    return;
  }
  chrome.command = chrome.command || {};
  chrome.command.userInfo = chrome.command.userInfo || {};
  var _info = chrome.command.userInfo;
  ['getUserID', 'getSEVersion', 'getSERegion'].forEach(function(e) {
    if (!_info[e]) {
      _info[e] = function(cb) {
        try {cb();} catch(e) {}
      };
    }
  });
  window.xPingback = function(objProps, callback) {
    this.url = objProps.url;
    this.hid = objProps.hid;
    this.seVersion = objProps.seVersion;
    this.seRegion = objProps.seRegion;
    this.extId = objProps.extId;
    this.extVersion = objProps.extVersion;

    var nextFuncs = [callback, this.getExtInfo, this.getSERegion, this.getSEVersion, this.getUserId];
    this.init(nextFuncs);
  };

  xPingback.prototype.init = function(nextFuncs) {
    var nextFunc = nextFuncs.pop();
    nextFunc.apply(this, [nextFuncs]);
  };

  xPingback.prototype.getUserId = function(nextFuncs) {
    var nextFunc = nextFuncs.pop(),
      self = this;

    if (!self.hid) {
      chrome.command.userInfo.getUserID(function(hid) {
        self.hid = hid;
        nextFunc.apply(self, [nextFuncs]);
      });
      return;
    }
    nextFunc.apply(self, [nextFuncs]);
  };

  xPingback.prototype.getSEVersion = function(nextFuncs) {
    var nextFunc = nextFuncs.pop(),
      self = this;

    if (!self.seVersion) {
      chrome.command.userInfo.getSEVersion(function(seVersion) {
        self.seVersion = seVersion;
        nextFunc.apply(self, [nextFuncs]);
      });
      return;
    }
    nextFunc.apply(self, [nextFuncs]);
  };

  xPingback.prototype.getSERegion = function(nextFuncs) {
    var nextFunc = nextFuncs.pop(),
      self = this;

    if (!self.seRegion) {
      chrome.command.userInfo.getSERegion(function(seRegion) {
        self.seRegion = seRegion;
        nextFunc.apply(self, [nextFuncs]);
      });
      return;
    }
    nextFunc.apply(self, [nextFuncs]);
  };

  xPingback.prototype.getExtInfo = function(nextFuncs) {
    var nextFunc = nextFuncs.pop(),
      self = this;

    if (!self.extId || !self.extVersion) {
      chrome.command.userInfo.getExtInfo(function(extInfo) {
        self.extId = extInfo.id;
        self.extVersion = extInfo.version;
        nextFunc && nextFunc.apply(self, [nextFuncs]);
      });
      return;
    }
    console.assert(nextFuncs.length === 0, "nextFuncs length must be 0");
    nextFunc.apply(self);
  };

  xPingback.prototype.sendPingback = (function() {
    function createUrl(obj) {
      var url = this.url;
      if (url.indexOf('?') === -1) {
        url += '?';
      }

      url += "hid=" + encodeURIComponent(this.hid) + "&";
      url += "seVersion=" + encodeURIComponent(this.seVersion) + "&";
      url += "seRegion=" + encodeURIComponent(this.seRegion) + "&";
      url += "extId=" + encodeURIComponent(this.extId) + "&";
      url += "extVersion=" + encodeURIComponent(this.extVersion) + "&";
      url += "t=" + new Date().getTime();

      Object.keys(obj).forEach(function(key) {
        var value = obj[key];

        // I am not going to encode key, only value will be encoded
        url += '&' + key + "=" + encodeURIComponent(obj[key]);
      });
      return url;
    }

    return function(obj) {
      var url = createUrl.apply(this, [obj]), img = new Image;
      img.src = url;
    };
  })();
})();

