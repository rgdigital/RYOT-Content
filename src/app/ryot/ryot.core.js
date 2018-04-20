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
  // }, 50);
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