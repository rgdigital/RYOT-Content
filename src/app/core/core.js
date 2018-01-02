"use strict";
/*
 * RYOT Content Bootstrap
 */

/*
 * Constructor
 */
var $ryot = function() {
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
 * Initialise core
 */
$ryot.prototype = {
  eventBus : {},
  data : {},
  parent : window.parent,
  init : function() {
    var self = this;
    this.setupSend();
    this.setupReciever();
  },
  setupSend : function() {
    var self = this;
    setInterval(function() {
      self.data.docHeight = self.getDocumentHeight();
      var str = JSON.stringify(self.data);
      self.parent.postMessage(str, '*');
    }, 250);
  },
  setupReciever : function() {
    var self = this;
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent,function(e) {
      var data = JSON.parse(e.data);
      console.log(data)
    },false);
  },
  getDocumentHeight : function() {
    var body = document.body,
        html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
  }
}