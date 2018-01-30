"use strict";
/*
 * RYOT Content Bootstrap
 */

/*
 * Constructor
 */
var $ryot = function(options) {
  this.options = options;
  this.init();
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
      callback();
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
 * Core classes shorthand
 */
$ryot.prototype.core = {};
$ryot.Core = $ryot.prototype.core;

/*
 * HTML Components shorthand
 */
$ryot.prototype.components = {};
$ryot.Component = $ryot.prototype.components;

/*
 * Props
 */
$ryot.prototype.data = {};
$ryot.prototype.parent = window.parent;

/*
 * Constructor / Init
 */
$ryot.prototype.init = function() {
  
  var self = this;

  this.data = {};
  this.data.docHeight = this.getDocumentHeight();

  this.addEventListeners();
  this.addEventDispatchers();

  // Delay this many times
  var delay = 5,
      i = 0;
  // Loop
  var delayedInit = setInterval(function() {
    if (i > delay) {
      self.setupComponents();
      clearInterval(delayedInit);
    }
    ++i;
  }, this.options.checkSpeed);
};
/*
 * 
 */
$ryot.prototype.addEventListeners = function() {
  var self = this;
  ADTECH.addEventListener('RYOT_PARENT_META', function(e) {
    var data = e.meta;
    var newData = {};
    // newData.eventsQueue = data.eventsQueue;
    // newData.eventsProcessed = data.eventsProcessed;
    newData.topPosition = data.topPosition;
    newData.docHeight = self.data.docHeight;
    newData.winHeight = data.winHeight;
    newData.scrollTop = data.scrollTop;
    newData.childScrollTop = (data.scrollTop-data.topPosition<0 ? 0 : data.scrollTop-data.topPosition);
    newData.visibleBounds = self.getVisibleBounds(data.scrollTop, newData.childScrollTop, data.topPosition, newData.docHeight, data.winHeight);
    // Set data
    self.data = newData;
  });
};

/*
 * 
 */
$ryot.prototype.addEventDispatchers = function() {
  ADTECH.event('RYOT_CHILD_META', this.data);
};

/*
 * Get Doc Height for sizing
 */
$ryot.prototype.getDocumentHeight = function() {
  return document.body.scrollHeight;
};

/*
 * Setup components
 */
$ryot.prototype.setupComponents = function() {
  var self = this;
  var components = this.components;
  for (var key in components) {
    components[key].prototype.parent = this;
    components[key].prototype.tools = new this.tools();
    components[key] = new components[key]();
  }
};

/*
 * Get visible bounds
 */
$ryot.prototype.getVisibleBounds = function(scrollTop, childScrollTop, topPos, docHeight, winHeight) {
  // Set vars
  var visibleTop = (childScrollTop - topPos < 0 ? 0 : childScrollTop - topPos);
  var visibleBottom = scrollTop + winHeight;
  // Limit
  if (visibleBottom > docHeight) {
    visibleBottom = docHeight;
  }
  return {
    visibleTop : visibleTop,
    visibleBottom : visibleBottom
  }
};