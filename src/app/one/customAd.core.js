/**
 * CustomAd.js Prototype - attached to CustomAd prototype
 */
var customAd = targetWindow.com.adtech.AdtechCustomAd$AD_ID$;

// Add window objects to elements property
customAd.prototype.elem = {};
customAd.prototype.elem.topWin = window.parent;
customAd.prototype.elem.targetWindow = targetWindow;

// Toolkit
<!-- inject: ./customAd.tools.js-->

/**
 * Events list
 * This method is never used, only here for ONE to parse
 */
customAd.prototype.declareEvents = function(advert) {
  
  // Parent events
  ADTECH.event('RYOT_PARENT_META');
  ADTECH.event('RYOT_RESIZE');
  ADTECH.event('RYOT_FILLWIDTH');

  // Child events
  ADTECH.event('RYOT_CHILD_META');
  ADTECH.event('RYOT_CHILD_RESIZE');

};

/**
 * preInit Method
 */
customAd.prototype.preInit = function() {
  if (window==null) return;
  window.com = com || {};
  com.adtech = window.com.adtech;
};

/**
 * Init customAd
 */
customAd.prototype.init = function(advert) {
  
  var self = this;

  // ADTECH advert data object
  this.advert = advert;

  // Elements
  this.elem.adContainer = advert.assetContainers.main.anchorDiv;
  this.elem.adContent = advert.assetContainers.main.anchorDiv.firstChild;
  this.elem.adIframe = this.elem.adContent.getElementsByTagName('iframe')[0];
  this.elem.adBody = document || this.elem.adIframe.contentWindow.document;

  // ADTECH libraries
  this.lib = {};
  this.lib.utils = targetWindow.com.adtech.Utils_$VERSION$;
  this.lib.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
  this.lib.richMediaEvent = targetWindow.com.adtech.RichMediaEvent_$VERSION$;

  // Meta data to pass to child
  this.metaData = {};

  // Setup reciever
  this.recieveMeta();  
};

/**
 * Parent data object
 */
customAd.prototype.data = {
  topPosition : 0,
  scrollTop : 0,
  winWidth : 0,
  winHeight : 0,
  docHeight : 0
};

/**
 * Child data
 */
// customAd.prototype.childData = {}

/**
 * Fire this stuff when ready (child meta is recieved)
 */
customAd.prototype.whenReady = function() {
  // Process data from parent
  this.handleParentData();
  // Setup dispatcher
  this.sendMeta();
};

/**
 * Handle Parent data
 */
customAd.prototype.handleParentData = function() {
  // Scroll position
  this.setupScrollData();
  // Get Ad wrapper position data
  this.getAdWrapperPosition();
  // Set advert wrapper height
  this.setAdHeight();
  // Setup resize event
  this.setupResize();
};

/**
 * Dispatch event to child
 */
customAd.prototype.dispatchEvent = function(eventName, data) {
  var richMediaEvent = new this.lib.richMediaEvent(eventName);
  var data = data || {};
  richMediaEvent.meta = data;
  this.advert.eventBus.dispatchEvent(richMediaEvent);
};

/**
 * Send meta data to child (advert)
 */
customAd.prototype.sendMeta = function() {
  var self = this;
  setInterval(function() {
    self.dispatchEvent('RYOT_PARENT_META', self.data);
  }, 100);
};

/**
 * Recieve meta data from child
 */
customAd.prototype.recieveMeta = function() {
  var self = this;
  // Meta data
  this.advert.eventBus.addEventListener('RYOT_CHILD_META', function(e) {
    self.data.docHeight = e.meta.docHeight;
    // Set advert wrapper height
    self.setAdHeight(e.meta.docHeight, true);
    // Meta is ready, so fire
    self.whenReady();
  });
  // Check if wrapper should fill container
  this.advert.eventBus.addEventListener('RYOT_FILLWIDTH', function(e) {
    self.setAdToFillContainer();
    self.setAdHeight(self.data.docHeight);
  });
};

/**
 * 
 */
customAd.prototype.getAdWrapperPosition = function() {
  var element = this.elem.adContainer;
  var bodyRect = document.body.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      top = elemRect.top - bodyRect.top;
  this.data.topPosition = top;
},

/**
 * 
 */
customAd.prototype.setupScrollData = function() {
  var self = this;
  window.addEventListener('scroll', wheel, false );
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
  this.data.scrollTop = getScrollTop();
}

customAd.prototype.setupResize = function() {
  var self = this;
  var winSize = self.getWindowSize();
  self.data.winWidth = winSize.width;
  self.data.winHeight = winSize.height;
  window.addEventListener('resize', function(){
    self.dispatchEvent('RYOT_RESIZE', self.data);
  }, true);
  // Recieve data
  this.advert.eventBus.addEventListener('RYOT_CHILD_RESIZE', function(e) {
    var winSize = self.getWindowSize();
    self.data.winWidth = winSize.width;
    self.data.winHeight = winSize.height;
    self.setAdHeight(e.meta.docHeight);
  });
};

customAd.prototype.getWindowSize = function() {
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
};

customAd.prototype.setAdHeight = function(height, force) {
  
  if (typeof height == 'undefined') return;
  var topWrapper = this.elem.adContainer;
  var contentWrapper = this.elem.adContent;
  var iframe = contentWrapper.firstChild;
  var docBody = this.elem.docBody;

  // Top wrapper
  // topWrapper.style.width = "auto";
  topWrapper.style.height = "auto";

  // Style
  contentWrapper.style.clip = "";
  topWrapper.style.position = "absolute";
  topWrapper.style.left = 0;
  topWrapper.style.top = 0;

  if (height!==this.data.docHeight || force==true) {

    // this.data.docHeight = height;
    // height = this.data.docHeight;

    // topWrapper.style.height = 0 + "px";
    topWrapper.style.height = height + "px";
    // 
    // contentWrapper.style.height = 0 + "px";
    contentWrapper.style.height = height + "px";
    // 
    // iframe.style.height = 0 + "px";
    iframe.style.height = height + "px";

    // Finalise
    this.data.docHeight = height;
  }
};

customAd.prototype.setAdToFillContainer = function() {
  
  var topWrapper = this.elem.adContainer;
  var contentWrapper = this.elem.adContent;
  var iframe = contentWrapper.firstChild;
  var docBody = this.elem.docBody;

  topWrapper.style.width = "100%";
  contentWrapper.style.width = "100%";
  iframe.style.width = "100%";
  iframe.width = "100%";
};