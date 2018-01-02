"use strict";
// requestAnimationFrame Polyfill
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/*
 * RYOT Content Bootstrap PARENT
 */

/*
 * Constructor
 */
var $ryotParent = function(iframe) {
  this.iframe = iframe;
  this.init();
};

$ryotParent.prototype = {
  data : {},
  init : function() {
    this.setupScrollData();
    this.setupSend();
    this.setupReciever();
  },
  setupSend : function() {
    var self = this;
    // var data = this.data;
    setInterval(function() {
      var str = JSON.stringify(self.data);
      self.iframe.contentWindow.postMessage(str.toString(), '*');
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
      self.setIframeHeight(data.docHeight);
    },false);
  },
  setIframeHeight : function(height) {
    if (height!==this.data.height) {
      this.data.height = height;
      this.iframe.style.height = height + "px";
    }
  },
  setupScrollData : function() {
    var self = this;
    window.addEventListener( 'scroll', wheel, false );
    function getScrollTop() {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
      return top;
    }
    var lastOffset = getScrollTop();
    var lastDate = new Date().getTime();
    function wheel(e) {
      self.data.scrollTop = getScrollTop();
    }
  }
};