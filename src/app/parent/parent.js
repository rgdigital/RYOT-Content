"use strict";
/*
 * RYOT Content Bootstrap PARENT
 */

// Constructor
var $ryotParent = function(iframe) {
  this.iframe = iframe;
  this.init();
};

// Proto
$ryotParent.prototype = {
  data : {
    topPosition : 0,
    scrollTop : 0,
    winWidth : 0,
    winHeight : 0,
    docHeight : 0
  },
  init : function() {
    this.childWindow = this.iframe.contentWindow;
    this.options = this.getOptions();
    this.childModifiers();
  },
  getOptions : function() {
    var body = this.childWindow.document.body;
    var options = {};
    options.resizeOption = body.getAttribute('data-ryot-resize') == "true" ? true : false;
    options.fillWidthOption = body.getAttribute('data-ryot-fillwidth') == "true" ? true : false;
    return options;
  },
  childModifiers : function() {
    var self = this;
    // Child ryot app
    var $app = this.childWindow.$app;
    // Get iframe height from child document
    var height = this.getDocHeight();
    // Set iframe height
    this.setAdHeight(height);

    // Get position of iframe from top of viewport
    this.getIframeTopPosition();

    // Scroll action
    this.scrollAction();

    // Resize event handler
    this.resizeHandler();

    // Window size
    var winSize = this.getWindowSize();
    $app.data.winWidth = winSize.width;
    $app.data.winHeight = winSize.height;

    // Attach resize event to iframe?
    if (this.options.resizeOption) {
      window.addEventListener("resize", function() {
        // Get iframe height from child document
        var height = self.getDocHeight();
        // Set iframe height
        self.setAdHeight(height);
      });
    }
    // Make iframe stretch to fill parent
    if (this.options.fillWidthOption) {
      this.iframe.style.width = "100%";
    }
  },
  getDocHeight : function() {
    return this.childWindow.document.body.scrollHeight;
  },
  setAdHeight : function(height, force) {
    if (typeof height == 'undefined') return;
    this.iframe.style.height = height + "px";
  },
  getIframeTopPosition : function() {
    var $app = this.childWindow.$app;
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = this.iframe.getBoundingClientRect(),
        top = elemRect.top - bodyRect.top;
    $app.data.topPosition = top;
  },
  scrollAction : function() {
    var $app = this.childWindow.$app;
    var data = this.data;
    window.addEventListener('scroll', wheel, false );
    function getScrollTop() {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
      return top;
    }
    var lastOffset = getScrollTop();
    var lastDate = new Date().getTime();
    function wheel(e) {
      setData()
    }
    function setData() {
      $app.data.scrollTop = getScrollTop();
      $app.data.childScrollTop = ($app.data.scrollTop-$app.data.topPosition<0 ? 0 : $app.data.scrollTop-$app.data.topPosition);      
    }
    setData()
  },
  getWindowSize : function() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {
      width : x,
      height : y
    };
  },
  resizeHandler : function() {
    var self = this;
    window.addEventListener("resize", function() {
      // Get iframe height from child document
      var height = self.getDocHeight();
      // Set iframe height
      self.setAdHeight(height);
    })
  }
};