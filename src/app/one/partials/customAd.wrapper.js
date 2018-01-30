/**
 * Boilerplate code required to hook into the ADTECH rich media library.
 *
 * For API documentation, please contact canvas-help@adtech.com
 */
(function(adConfig) {

  /*
   * Vidible check
   * This assigns the vidible parent window as the target window
   */
  if (!adConfig.preview) {
    adConfig.assetContainers.main.isExpandable = true;
    try {
      var parentCheck = window.frameElement ? true : false;
      var targetWin = parentCheck ? window.frameElement.parentNode.firstChild.firstChild.contentWindow : window;
      adConfig.overrides = adConfig.overrides || {};
      adConfig.overrides.displayWindowTarget = targetWin;
    } catch(e) {
      console.warn('Failed to find target iframe in player environment: Has the structure changed?\n', e);
    }
  }
  
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

  /*
   * CustomAd.js Constructor
   */
  targetWindow.com.adtech.AdtechCustomAd$AD_ID$ = function() {};
  
  /*
   * Include partials
   */
  // Core class
  <!-- inject: ./../customAd.core.js-->

  targetWindow.adtechCallbackInstances = targetWindow.adtechCallbackInstances || [];
  var instanceIndex = targetWindow.adtechCallbackInstances.length;
  targetWindow.adtechCallbackInstances[instanceIndex] = new targetWindow.com.adtech.AdtechCustomAd$AD_ID$();

  targetWindow.adtechAdCallbacks = targetWindow.adtechAdCallbacks || {};
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] =
      targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] || [];
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid].push(
      targetWindow.adtechCallbackInstances[instanceIndex]);
})(adtechAdConfig);