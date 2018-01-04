(function() {(window["views"] = window["views"] || {})["index"] = function() { return "<div>  <p>Lorem ipsum dolor sit amet</p></div>";};})();
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
$ryot.prototype.data = {};
$ryot.prototype.parent = window.parent;

/*
 * Constructor / Init
 */
$ryot.prototype.init = function() {
  var self = this;
  this.setupSend();
  this.setupReciever();
  this.setupCore();
  this.setupComponents();
  this.docHeight = this.getDocumentHeight();
};

/*
 * Send data to parent Iframe
 */
$ryot.prototype.setupSend = function() {
  var self = this;
  setInterval(function() {
    var str = JSON.stringify(self.data);
    self.parent.postMessage(str, '*');
  }, this.options.checkSpeed);
};

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
    self.data = self.processData(data);
  },false);
};

/*
 * Process data from parent
 */
$ryot.prototype.processData = function(data) {
  var newData = {};
  newData.topPosition = data.topPosition;
  newData.docHeight = this.docHeight;
  newData.winHeight = data.winHeight;
  newData.scrollTop = data.scrollTop;
  newData.childScrollTop = (data.scrollTop-data.topPosition<0 ? 0 : data.scrollTop-data.topPosition);
  newData.visibleBounds = this.getVisibleBounds(data.scrollTop, newData.childScrollTop, data.topPosition, newData.docHeight, data.winHeight);
  return newData;
}

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
 * Core Tools class
 */
$ryot.Core.tools = function() {
  return this;
};

$ryot.Core.tools.prototype = {
  addClass : function(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },
  removeClass : function(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },
  toggleClass : function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  },
  hasClass : function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },
  getElemPosition : function(elem) {
    var elemRect = elem.getBoundingClientRect()
    return elemRect;
  },
}
$ryot.Component.followscroll = function() {
  this.options = this.parent.options;
  this.elements = this.getElements();
  this.scrolling();
}

$ryot.Component.followscroll.prototype.getElements = function() {
  var elements = document.getElementsByClassName('ryot-followscroll');
  return elements;
};

$ryot.Component.followscroll.prototype.scrolling = function() {
  var self = this;
  setInterval(function() {
    self.elements[0].style.top = self.parent.data.childScrollTop + "px";
  }, this.options.checkSpeed);
};
$ryot.Component.inview = function() {
  this.options = this.parent.options;
  this.elements = this.getElements();
  this.tools = this.parent.core.tools;

  this.threshold = 15;

  this.scrolling();
}

$ryot.Component.inview.prototype.getElements = function() {
  var elements = document.getElementsByClassName('ryot-inview');
  return elements;
};

$ryot.Component.inview.prototype.scrolling = function() {
  var self = this;
  // Delay this many times
  var delay = 5,
      i = 0;
  // Loop
  setInterval(function() {
    if (i > delay)
      self.areElemsInView();
    ++i;
  }, this.options.checkSpeed);
};

$ryot.Component.inview.prototype.areElemsInView = function() {
  
  var elems = this.elements;
  var data = this.parent.data;
  var bounds = data.visibleBounds;
  var scrollTop = data.scrollTop;
  var topMargin = data.topPosition;
  var winHeight = data.winHeight;
  var docHeight = data.docHeight;

  var visibleTop = (scrollTop - topMargin < 0 ? 0 : scrollTop - topMargin);
  var visibleBottom = scrollTop - topMargin + winHeight;

  for (var i = elems.length - 1; i >= 0; i--) {
    var pos = this.getElemPosition(elems[i]);
    var elemPos = pos.top + data.topPosition;
    var elem = elems[i];
    if (pos.top >= (visibleTop-this.threshold) && pos.bottom <= (visibleBottom+this.threshold)) {
      if (!this.tools.hasClass(elem, "ryot-visible")) {
        this.tools.addClass(elem, "ryot-visible");
      }
    } else {
      if (this.tools.hasClass(elem, "ryot-visible")) {
        this.tools.removeClass(elem, "ryot-visible");
      }
    }
  }
};

$ryot.Component.inview.prototype.getElemPosition = function(elem) {
  var pos = this.tools.getElemPosition(elem);
  return {
    top : pos.top,
    bottom : pos.bottom
  };
};
$ryot.ready(function() {
  var options = {
    // Speed in ticks between data checks
    checkSpeed : 150
  };
  var app = new $ryot(options);
})