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
  
  // Adtech events
  ADTECH.event('RYOT_META');
  ADTECH.event('RYOT_RESIZE');

  // Adtech methods 
  ADTECH.event('FIRE_RYOT_RESIZE');

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
  this.advert = advert;

  this.elem.adContainer = advert.assetContainers.main.anchorDiv;
  this.elem.adContent = advert.assetContainers.main.anchorDiv.firstChild;
  this.elem.adIframe = this.elem.adContent.firstChild;
  this.elem.adBody = document || this.elem.adIframe.contentWindow.document;

  this.data = {};
  this.data.utils = targetWindow.com.adtech.Utils_$VERSION$;
  this.data.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
  this.data.richMediaEvent = targetWindow.com.adtech.RichMediaEvent_$VERSION$;

  // Meta data to pass to child
  this.metaData = {};

  // Get data
  this.setupScrollData();
  // this.getIframePosition();

  setInterval(function() {
    var richMediaEvent = new self.data.richMediaEvent('RYOT_META');
    richMediaEvent.meta = {
      "metaData" : self.metaData
    };
    self.advert.eventBus.dispatchEvent(richMediaEvent);
  }, 100);
};

customAd.prototype.getIframePosition = function() {
  var element = this.elem.iframe;
  var bodyRect = this.elem.adBody.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      top = elemRect.top - bodyRect.top;
      // bottom = elemRect.top - bodyRect.top,
      // console.log(bodyRect, elemRect)
  this.metaData.topPosition = top;
};

customAd.prototype.setupScrollData = function() {
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
    self.metaData.scrollTop = getScrollTop();
  }
  this.metaData.scrollTop = getScrollTop();
};