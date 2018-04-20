"use strict";
/*
 * RYOT Content Bootstrap
 * Ready Methods (STATIC methods) 
 */

$ryot.loaded = {
  core : true,
  components : true
};

/*
 * DOM is ready
 */
$ryot.ready = function(callback) {
  
  var self = this;
  var baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  this.coreLoaded(callback);

  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        // var preload = new self.preload(readyList[i].fn.call(window, readyList[i].ctx));
        var preload = new self.preload(readyList[i].fn);
      }
      readyList = [];
    }
  }
  function readyStateChange() {
    if ( document.readyState === "complete" ) {
      ready();
    }
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback for docReady(fn) must be a function");
  }
  if (readyFired) {
    setTimeout(function() {
      // callback();
    }, 1);
    return;
  } else {
    readyList.push({fn: callback});
  }
  if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
    setTimeout(ready, 1);
  } else if (!readyEventHandlersInstalled) {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", ready, false);
      window.addEventListener("load", ready, false);
    } else {
      document.attachEvent("onreadystatechange", readyStateChange);
      window.attachEvent("onload", ready);
    }
    readyEventHandlersInstalled = true;
  }

};

/*
 * Preload assets
 */
$ryot.preload = function(callback) {

  var spinner;
  var imageAssets = document.getElementsByTagName('img');
  var assetsStr = '';
  var assetCount = imageAssets.length;
  // Build cache
  var imageCache = document.createElement('div');
  document.body.appendChild(imageCache);
  imageCache.style.display = 'none';
  // Loop through and load
  for (var i = 0; i < assetCount; i++) {
    preloadImage(imageAssets[i].src, i, assetCount);
    assetsStr += '<img src="'+imageAssets[i].src+'"/>';
  }
  imageCache.innerHTML += assetsStr;
  addPreloaderSpinner();

  function addPreloaderSpinner() {
    spinner = document.createElement('div');
    spinner.id = "spinner";
    spinnerText = document.createElement('p');
    spinnerText.innerHTML = "Loading";
    // var iframe = window.parent.document.getElementById('ryotiframe');
    // console.log(iframe);
    spinner.appendChild(spinnerText);
    document.body.appendChild(spinner);
  };
  // Fire preloader
  function preloadImage(src, i, assetCount) {
    var image = new Image();
    image.onload = loading.bind(null, src, i, assetCount);
    image.src = src;
  };
  // DOM interactions
  function loading(src, i, assetCount, event) {
    var amount = (assetCount/100) * i * 100;
    if (i==assetCount-1) loadingComplete();
  };
  // Complete
  function loadingComplete() {
    spinner.style.display = "none";
    callback();
  };

}

/*
 * RYOT Core fully loaded
 */
$ryot.coreLoaded = function(callback) {
  var self = this;
  // console.log(this)
  var timer = function() {
    setTimeout(function() {
      // console.log(self.loaded);
      for (var key in self.loaded) {
        // console.log(self.loaded[key]) 
        if (!self.loaded[key]) {
          console.log('check');
          timer();
          return false;
        }
        loaded();
      }
    }, 10);
  }
  timer();

  var loaded = function() {
    // callback();
    // new $ryot();
    // console.log('ready');
  }
};