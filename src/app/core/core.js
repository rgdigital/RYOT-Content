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
  var baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;
  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
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
$ryot.prototype.eventBus = {};
$ryot.prototype.sendData = {};
$ryot.prototype.parent = window.parent;
$ryot.prototype.processedEvents = [];

/*
 * Constructor / Init
 */
$ryot.prototype.init = function() {
  var self = this;
  this.setupSend();
  this.setupReciever();
  this.setupCore();
  this.docHeight = this.getDocumentHeight();
  this.eventBus = this.core.eventBus;

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
 * Send data to parent Iframe
 */
$ryot.prototype.setupSend = function() {
  var self = this;
  setInterval(function() {
    var sendData = self.processSendData(self.sendData);
    var str = JSON.stringify(sendData);
    self.parent.postMessage(str, '*');
  }, this.options.checkSpeed);
};

/*
 * Send data to parent Iframe
 */
$ryot.prototype.processSendData = function(data) {
  var newData = {};
  newData.docHeight = this.docHeight;
  newData.processedEvents = this.processedEvents;
  return newData;
}

/*
 * Receive data from parent iframe
 */
$ryot.prototype.setupReciever = function() {
  var self = this;
  // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listen to message from child window
  eventer(messageEvent,function(e) {
    var data = JSON.parse(e.data);
    self.data = self.processRecievedData(data);
    // If there are events to be processed
    if (data.eventQueue.length>0) {
      // self.eventBus.processEvents();
    }
  },false);
};

/*
 * Process data from parent
 */
$ryot.prototype.processRecievedData = function(data) {
  var newData = {};
  newData.eventQueue = data.eventQueue;
  newData.topPosition = data.topPosition;
  newData.docHeight = this.docHeight;
  newData.winHeight = data.winHeight;
  newData.scrollTop = data.scrollTop;
  newData.childScrollTop = (data.scrollTop-data.topPosition<0 ? 0 : data.scrollTop-data.topPosition);
  newData.visibleBounds = this.getVisibleBounds(data.scrollTop, newData.childScrollTop, data.topPosition, newData.docHeight, data.winHeight);
  return newData;
}

/*
 * Setup core
 */
$ryot.prototype.setupCore = function() {
  var self = this;
  var core = this.core;
  for (var key in core) {
    core[key].prototype.parent = this;
    core[key] = new core[key]();
  }
};

/*
 * Setup components
 */
$ryot.prototype.setupComponents = function() {
  var self = this;
  var components = this.components;
  for (var key in components) {
    components[key].prototype.parent = this;
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

/*
 * Get Doc Height for sizing
 */
$ryot.prototype.getDocumentHeight = function() {
  var body = document.body,
      html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
  return height;
};