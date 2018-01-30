/**
 * Boilerplate code required to hook into the ADTECH rich media library.
 *
 * For API documentation, please contact canvas-help@adtech.com
 */
(function(adConfig) {
  var requiresBreakout = false;
  if (!adConfig.overrides || adConfig.overrides.displayWindowTarget != self) {
    for (var id in adConfig.assetContainers) {
      if (adConfig.assetContainers.hasOwnProperty(id)) {
        var container = adConfig.assetContainers[id];
        if (container.type != 'inlineDiv' || container.isExpandable) {
          requiresBreakout = true;
          break;
        }
      }
    }
  }

  if (adConfig.overrides && adConfig.overrides.displayWindowTarget) {
    var displayWindowTarget = adConfig.overrides.displayWindowTarget;
    displayWindowTarget = (typeof adtechIframeHashArray != 'undefined' && self != top) ?
        displayWindowTarget.parent : displayWindowTarget;
  } else {
    var calculatedTarget = null;
    var currentWindow = parent;
    while (currentWindow != undefined) {
      try {
        var targetDoc = currentWindow.document;
        if (targetDoc) {
          calculatedTarget = currentWindow;
        }
      } catch(e) {}
      currentWindow = (currentWindow == top) ? null : currentWindow.parent;
    }
    var displayWindowTarget = calculatedTarget || top;
  }

  var targetIsFriendly = false;
  try {
    var targetDoc = displayWindowTarget.document;
    if (targetDoc) {
      targetIsFriendly = true;
    }
  } catch(e) {}

  var targetWindow = (requiresBreakout && (self != top && targetIsFriendly)) ?
          displayWindowTarget : self;

  targetWindow.com = targetWindow.com || {};
  targetWindow.com.adtech = targetWindow.com.adtech || {};

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$ = function() {
    // Custom code class constructor.
  };

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$.prototype = {

    /**
     * Entry point methods.
     *
     * Automatically invoked by the rich media library when the library API is
     * available to use, and the Advert instance has been instantiated.
     */
  preInit: function() {
    window.com = com || {};
    com.adtech = targetWindow.com.adtech;
    },

    init: function(advert) {
      if (!advert.richView) {
        // The backup client can not render the rich version of the advert.
        return;
      }
      
      // A few useful things to help you get started. Please delete as necessary!
      this.advert = advert;
    this.utils = com.adtech.Utils_$VERSION$;
      this.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
      this.richMediaEvent = com.adtech.RichMediaEvent_$VERSION$;

      /*
       * This is how you listen for your custom events.
       * ADTECH.close() is actually just an alias of ADTECH.event('close').
       */
      advert.eventBus.addEventListener('close',
          this.utils.createClosure(this, this.closeHandler));

      /*
       * Want to wait until the DOM or the page has loaded? No problem!
       */
      if (this.globalEventBus.pageLoaded) {
        this.pageLoadHandler();
      } else {
        this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_LOAD,
            this.utils.createClosure(this, this.pageLoadHandler));
      }
    },

    /*********************************************************
     *
     * Create your instance methods below.
     *
     * Please remember not to add a trailing comma to you last
     * method - IE will not like that!
     *
     *********************************************************/

    closeHandler: function() {
      /*
       * This will get invoked when the close event has been dispatched by any one
       * of your ad units.
       */
    },

    pageLoadHandler: function() {
      // The page has now loaded. Feel free to display an awesome advert.
    }
  };

  targetWindow.adtechCallbackInstances = targetWindow.adtechCallbackInstances || [];
  var instanceIndex = targetWindow.adtechCallbackInstances.length;
  targetWindow.adtechCallbackInstances[instanceIndex] =
      new targetWindow.com.adtech.AdtechCustomAd$AD_ID$();

  targetWindow.adtechAdCallbacks = targetWindow.adtechAdCallbacks || {};
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] =
      targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] || [];
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid].push(
      targetWindow.adtechCallbackInstances[instanceIndex]);
})(adtechAdConfig);
