!function(e){if(!e.preview){e.assetContainers.main.isExpandable=!0;try{var t=!!window.frameElement,n=t?window.frameElement.parentNode.firstChild.firstChild.contentWindow:window;e.overrides=e.overrides||{},e.overrides.displayWindowTarget=n}catch(e){console.warn("Failed to find target iframe in player environment: Has the structure changed?\n",e)}}var a=!1;if(!e.overrides||e.overrides.displayWindowTarget!=self)for(var o in e.assetContainers)if(e.assetContainers.hasOwnProperty(o)){var i=e.assetContainers[o];if("inlineDiv"!=i.type||i.isExpandable){a=!0;break}}if(e.overrides&&e.overrides.displayWindowTarget){var r=e.overrides.displayWindowTarget;r="undefined"!=typeof adtechIframeHashArray&&self!=top?r.parent:r}else{for(var d=null,c=parent;void 0!=c;){try{var s=c.document;s&&(d=c)}catch(e){}c=c==top?null:c.parent}var r=d||top}var l=!1;try{var s=r.document;s&&(l=!0)}catch(e){}var v=a&&self!=top&&l?r:self;v.com=v.com||{},v.com.adtech=v.com.adtech||{},v.com.adtech.AdtechCustomAd$AD_ID$=function(){};var h=v.com.adtech.AdtechCustomAd$AD_ID$;h.prototype.elem={},h.prototype.elem.topWin=window.parent,h.prototype.elem.targetWindow=v,h.prototype.tools={events:{triggerEvent:function(e,t){var n;document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):document.createEventObject&&(n=document.createEventObject(),n.eventType=t),n.eventName=t,e.dispatchEvent?e.dispatchEvent(n):e.fireEvent&&htmlEvents["on"+t]?e.fireEvent("on"+n.eventType,n):e[t]?e[t]():e["on"+t]&&e["on"+t]()},addEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&htmlEvents["on"+t]?e.attachEvent("on"+t,n):e["on"+t]=n},removeEvent:function(e,t,n){e.removeventListener?e.removeEventListener(t,n,!1):e.detachEvent&&htmlEvents["on"+t]?e.detachEvent("on"+t,n):e["on"+t]=null}},mask:function(e,t){},getPercentage:function(e,t){return e/100*t},getSizeStyle:function(e,t){var n=(this.tools,{}),a=parseInt(e,10),e=e.split(a)[1];return data={num:isNaN(parseFloat(a))?0:a,val:void 0!==e?e:"px"},"%"==data.val?(n.px=Math.round(t/100*data.num),n.percent=data.num):(n.px=data.num,n.percent=data.num/t*100),n},getViewportSize:function(e){if(e=e||window,null!=e.innerWidth)return{w:e.innerWidth,h:e.innerHeight};var t=e.document;return"CSS1Compat"==document.compatMode?{w:t.documentElement.clientWidth,h:t.documentElement.clientHeight}:{w:t.body.clientWidth,h:t.body.clientHeight}}},h.prototype.declareEvents=function(e){ADTECH.event("RYOT_META"),ADTECH.event("RYOT_RESIZE"),ADTECH.event("FIRE_RYOT_RESIZE")},h.prototype.preInit=function(){null!=window&&(window.com=com||{},com.adtech=window.com.adtech)},h.prototype.init=function(e){var t=this;this.advert=e,this.elem.adContainer=e.assetContainers.main.anchorDiv,this.elem.adContent=e.assetContainers.main.anchorDiv.firstChild,this.elem.adIframe=this.elem.adContent.firstChild,this.elem.adBody=document||this.elem.adIframe.contentWindow.document,this.data={},this.data.utils=v.com.adtech.Utils_$VERSION$,this.data.globalEventBus=v.adtechAdManager_$VERSION$.globalEventBus,this.data.richMediaEvent=v.com.adtech.RichMediaEvent_$VERSION$,this.metaData={},this.setupScrollData(),setInterval(function(){var e=new t.data.richMediaEvent("RYOT_META");e.meta={metaData:t.metaData},t.advert.eventBus.dispatchEvent(e)},100)},h.prototype.getIframePosition=function(){var e=this.elem.iframe,t=this.elem.adBody.getBoundingClientRect(),n=e.getBoundingClientRect(),a=n.top-t.top;this.metaData.topPosition=a},h.prototype.setupScrollData=function(){function e(){var e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}function t(t){n.metaData.scrollTop=e()}var n=this;window.addEventListener("scroll",t,!1);e(),(new Date).getTime();this.metaData.scrollTop=e()},v.adtechCallbackInstances=v.adtechCallbackInstances||[];var m=v.adtechCallbackInstances.length;v.adtechCallbackInstances[m]=new v.com.adtech.AdtechCustomAd$AD_ID$,v.adtechAdCallbacks=v.adtechAdCallbacks||{},v.adtechAdCallbacks[e.adServerVars.uid]=v.adtechAdCallbacks[e.adServerVars.uid]||[],v.adtechAdCallbacks[e.adServerVars.uid].push(v.adtechCallbackInstances[m])}(adtechAdConfig);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbUFkLndyYXBwZXIuanMiXSwibmFtZXMiOlsiYWRDb25maWciLCJwcmV2aWV3IiwiYXNzZXRDb250YWluZXJzIiwibWFpbiIsImlzRXhwYW5kYWJsZSIsInBhcmVudENoZWNrIiwid2luZG93IiwiZnJhbWVFbGVtZW50IiwidGFyZ2V0V2luIiwicGFyZW50Tm9kZSIsImZpcnN0Q2hpbGQiLCJjb250ZW50V2luZG93Iiwib3ZlcnJpZGVzIiwiZGlzcGxheVdpbmRvd1RhcmdldCIsImUiLCJjb25zb2xlIiwid2FybiIsInJlcXVpcmVzQnJlYWtvdXQiLCJzZWxmIiwiaWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRhaW5lciIsInR5cGUiLCJhZHRlY2hJZnJhbWVIYXNoQXJyYXkiLCJ0b3AiLCJwYXJlbnQiLCJjYWxjdWxhdGVkVGFyZ2V0IiwiY3VycmVudFdpbmRvdyIsInVuZGVmaW5lZCIsInRhcmdldERvYyIsImRvY3VtZW50IiwidGFyZ2V0SXNGcmllbmRseSIsInRhcmdldFdpbmRvdyIsImNvbSIsImFkdGVjaCIsIkFkdGVjaEN1c3RvbUFkJEFEX0lEJCIsImN1c3RvbUFkIiwicHJvdG90eXBlIiwiZWxlbSIsInRvcFdpbiIsInRvb2xzIiwiZXZlbnRzIiwidHJpZ2dlckV2ZW50IiwiZWwiLCJldmVudE5hbWUiLCJldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiY3JlYXRlRXZlbnRPYmplY3QiLCJldmVudFR5cGUiLCJkaXNwYXRjaEV2ZW50IiwiZmlyZUV2ZW50IiwiaHRtbEV2ZW50cyIsImFkZEV2ZW50IiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsInJlbW92ZUV2ZW50IiwicmVtb3ZldmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwibWFzayIsInZhbCIsImdldFBlcmNlbnRhZ2UiLCJudW0iLCJwZXJjZW50YWdlIiwiZ2V0U2l6ZVN0eWxlIiwic2l6ZSIsInByb2Nlc3NlZCIsInRoaXMiLCJwYXJzZUludCIsInNwbGl0IiwiZGF0YSIsImlzTmFOIiwicGFyc2VGbG9hdCIsIk1hdGgiLCJyb3VuZCIsImdldFZpZXdwb3J0U2l6ZSIsInciLCJpbm5lcldpZHRoIiwiaCIsImlubmVySGVpZ2h0IiwiZCIsImNvbXBhdE1vZGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImJvZHkiLCJkZWNsYXJlRXZlbnRzIiwiYWR2ZXJ0IiwiQURURUNIIiwicHJlSW5pdCIsImluaXQiLCJhZENvbnRhaW5lciIsImFuY2hvckRpdiIsImFkQ29udGVudCIsImFkSWZyYW1lIiwiYWRCb2R5IiwidXRpbHMiLCJVdGlsc18kVkVSU0lPTiQiLCJnbG9iYWxFdmVudEJ1cyIsImFkdGVjaEFkTWFuYWdlcl8kVkVSU0lPTiQiLCJyaWNoTWVkaWFFdmVudCIsIlJpY2hNZWRpYUV2ZW50XyRWRVJTSU9OJCIsIm1ldGFEYXRhIiwic2V0dXBTY3JvbGxEYXRhIiwic2V0SW50ZXJ2YWwiLCJtZXRhIiwiZXZlbnRCdXMiLCJnZXRJZnJhbWVQb3NpdGlvbiIsImVsZW1lbnQiLCJpZnJhbWUiLCJib2R5UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImVsZW1SZWN0IiwidG9wUG9zaXRpb24iLCJnZXRTY3JvbGxUb3AiLCJkb2MiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsImNsaWVudFRvcCIsIndoZWVsIiwiRGF0ZSIsImdldFRpbWUiLCJhZHRlY2hDYWxsYmFja0luc3RhbmNlcyIsImluc3RhbmNlSW5kZXgiLCJsZW5ndGgiLCJhZHRlY2hBZENhbGxiYWNrcyIsImFkU2VydmVyVmFycyIsInVpZCIsInB1c2giLCJhZHRlY2hBZENvbmZpZyJdLCJtYXBwaW5ncyI6IkNBS0EsU0FBVUEsR0FNUixJQUFLQSxFQUFTQyxRQUFTLENBQ3JCRCxFQUFTRSxnQkFBZ0JDLEtBQUtDLGNBQWUsQ0FDN0MsS0FDRSxHQUFJQyxLQUFjQyxPQUFPQyxh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U0FJMUJ0RCxNQUFLbUMsU0FBU2UsVUFBWUgsS0FHNUJwRixFQUFhNEYsd0JBQTBCNUYsRUFBYTRGLDJCQUNwRCxJQUFJQyxHQUFnQjdGLEVBQWE0Rix3QkFBd0JFLE1BQ3pEOUYsR0FBYTRGLHdCQUF3QkMsR0FBaUIsR0FBSTdGLEdBQWFDLElBQUlDLE9BQU9DLHNCQUVsRkgsRUFBYStGLGtCQUFvQi9GLEVBQWErRixzQkFDOUMvRixFQUFhK0Ysa0JBQWtCL0gsRUFBU2dJLGFBQWFDLEtBQ2pEakcsRUFBYStGLGtCQUFrQi9ILEVBQVNnSSxhQUFhQyxTQUN6RGpHLEVBQWErRixrQkFBa0IvSCxFQUFTZ0ksYUFBYUMsS0FBS0MsS0FDdERsRyxFQUFhNEYsd0JBQXdCQyxLQUN4Q00iLCJmaWxlIjoiY3VzdG9tQWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJvaWxlcnBsYXRlIGNvZGUgcmVxdWlyZWQgdG8gaG9vayBpbnRvIHRoZSBBRFRFQ0ggcmljaCBtZWRpYSBsaWJyYXJ5LlxuICpcbiAqIEZvciBBUEkgZG9jdW1lbnRhdGlvbiwgcGxlYXNlIGNvbnRhY3QgY2FudmFzLWhlbHBAYWR0ZWNoLmNvbVxuICovXG4oZnVuY3Rpb24oYWRDb25maWcpIHtcblxuICAvKlxuICAgKiBWaWRpYmxlIGNoZWNrXG4gICAqIFRoaXMgYXNzaWducyB0aGUgdmlkaWJsZSBwYXJlbnQgd2luZG93IGFzIHRoZSB0YXJnZXQgd2luZG93XG4gICAqL1xuICBpZiAoIWFkQ29uZmlnLnByZXZpZXcpIHtcbiAgICBhZENvbmZpZy5hc3NldENvbnRhaW5lcnMubWFpbi5pc0V4cGFuZGFibGUgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICB2YXIgcGFyZW50Q2hlY2sgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdmFyIHRhcmdldFdpbiA9IHBhcmVudENoZWNrID8gd2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5jb250ZW50V2luZG93IDogd2luZG93O1xuICAgICAgYWRDb25maWcub3ZlcnJpZGVzID0gYWRDb25maWcub3ZlcnJpZGVzIHx8IHt9O1xuICAgICAgYWRDb25maWcub3ZlcnJpZGVzLmRpc3BsYXlXaW5kb3dUYXJnZXQgPSB0YXJnZXRXaW47XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBmaW5kIHRhcmdldCBpZnJhbWUgaW4gcGxheWVyIGVudmlyb25tZW50OiBIYXMgdGhlIHN0cnVjdHVyZSBjaGFuZ2VkP1xcbicsIGUpO1xuICAgIH1cbiAgfVxuICBcbiAgdmFyIHJlcXVpcmVzQnJlYWtvdXQgPSBmYWxzZTtcbiAgaWYgKCFhZENvbmZpZy5vdmVycmlkZXMgfHwgYWRDb25maWcub3ZlcnJpZGVzLmRpc3BsYXlXaW5kb3dUYXJnZXQgIT0gc2VsZikge1xuICAgIGZvciAodmFyIGlkIGluIGFkQ29uZmlnLmFzc2V0Q29udGFpbmVycykge1xuICAgICAgaWYgKGFkQ29uZmlnLmFzc2V0Q29udGFpbmVycy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGFkQ29uZmlnLmFzc2V0Q29udGFpbmVyc1tpZF07XG4gICAgICAgIGlmIChjb250YWluZXIudHlwZSAhPSAnaW5saW5lRGl2JyB8fCBjb250YWluZXIuaXNFeHBhbmRhYmxlKSB7XG4gICAgICAgICAgcmVxdWlyZXNCcmVha291dCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWRDb25maWcub3ZlcnJpZGVzICYmIGFkQ29uZmlnLm92ZXJyaWRlcy5kaXNwbGF5V2luZG93VGFyZ2V0KSB7XG4gICAgdmFyIGRpc3BsYXlXaW5kb3dUYXJnZXQgPSBhZENvbmZpZy5vdmVycmlkZXMuZGlzcGxheVdpbmRvd1RhcmdldDtcbiAgICBkaXNwbGF5V2luZG93VGFyZ2V0ID0gKHR5cGVvZiBhZHRlY2hJZnJhbWVIYXNoQXJyYXkgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAhPSB0b3ApID9cbiAgICAgICAgZGlzcGxheVdpbmRvd1RhcmdldC5wYXJlbnQgOiBkaXNwbGF5V2luZG93VGFyZ2V0O1xuICB9IGVsc2Uge1xuICAgIHZhciBjYWxjdWxhdGVkVGFyZ2V0ID0gbnVsbDtcbiAgICB2YXIgY3VycmVudFdpbmRvdyA9IHBhcmVudDtcbiAgICB3aGlsZSAoY3VycmVudFdpbmRvdyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB0YXJnZXREb2MgPSBjdXJyZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICBpZiAodGFyZ2V0RG9jKSB7XG4gICAgICAgICAgY2FsY3VsYXRlZFRhcmdldCA9IGN1cnJlbnRXaW5kb3c7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgIGN1cnJlbnRXaW5kb3cgPSAoY3VycmVudFdpbmRvdyA9PSB0b3ApID8gbnVsbCA6IGN1cnJlbnRXaW5kb3cucGFyZW50O1xuICAgIH1cbiAgICB2YXIgZGlzcGxheVdpbmRvd1RhcmdldCA9IGNhbGN1bGF0ZWRUYXJnZXQgfHwgdG9wO1xuICB9XG5cbiAgdmFyIHRhcmdldElzRnJpZW5kbHkgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgdGFyZ2V0RG9jID0gZGlzcGxheVdpbmRvd1RhcmdldC5kb2N1bWVudDtcbiAgICBpZiAodGFyZ2V0RG9jKSB7XG4gICAgICB0YXJnZXRJc0ZyaWVuZGx5ID0gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cblxuICB2YXIgdGFyZ2V0V2luZG93ID0gKHJlcXVpcmVzQnJlYWtvdXQgJiYgKHNlbGYgIT0gdG9wICYmIHRhcmdldElzRnJpZW5kbHkpKSA/XG4gICAgICAgICAgZGlzcGxheVdpbmRvd1RhcmdldCA6IHNlbGY7XG4gIFxuICB0YXJnZXRXaW5kb3cuY29tID0gdGFyZ2V0V2luZG93LmNvbSB8fCB7fTtcbiAgdGFyZ2V0V2luZG93LmNvbS5hZHRlY2ggPSB0YXJnZXRXaW5kb3cuY29tLmFkdGVjaCB8fCB7fTtcblxuICAvKlxuICAgKiBDdXN0b21BZC5qcyBDb25zdHJ1Y3RvclxuICAgKi9cbiAgdGFyZ2V0V2luZG93LmNvbS5hZHRlY2guQWR0ZWNoQ3VzdG9tQWQkQURfSUQkID0gZnVuY3Rpb24oKSB7fTtcbiAgXG4gIC8qXG4gICAqIEluY2x1ZGUgcGFydGlhbHNcbiAgICovXG4gIC8vIENvcmUgY2xhc3NcbiAgLyoqXG4gICAqIEN1c3RvbUFkLmpzIFByb3RvdHlwZSAtIGF0dGFjaGVkIHRvIEN1c3RvbUFkIHByb3RvdHlwZVxuICAgKi9cbiAgdmFyIGN1c3RvbUFkID0gdGFyZ2V0V2luZG93LmNvbS5hZHRlY2guQWR0ZWNoQ3VzdG9tQWQkQURfSUQkO1xuICBcbiAgLy8gQWRkIHdpbmRvdyBvYmplY3RzIHRvIGVsZW1lbnRzIHByb3BlcnR5XG4gIGN1c3RvbUFkLnByb3RvdHlwZS5lbGVtID0ge307XG4gIGN1c3RvbUFkLnByb3RvdHlwZS5lbGVtLnRvcFdpbiA9IHdpbmRvdy5wYXJlbnQ7XG4gIGN1c3RvbUFkLnByb3RvdHlwZS5lbGVtLnRhcmdldFdpbmRvdyA9IHRhcmdldFdpbmRvdztcbiAgXG4gIC8vIFRvb2xraXRcbiAgLyoqXG4gICAqIEN1c3RvbSBBZCBUb29sc1xuICAgKi9cbiAgY3VzdG9tQWQucHJvdG90eXBlLnRvb2xzID0ge1xuICAgIGV2ZW50cyA6IHtcbiAgICAgIHRyaWdnZXJFdmVudCA6IGZ1bmN0aW9uKGVsLCBldmVudE5hbWUpe1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkgey8vIElFIDwgOVxuICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgICBldmVudC5ldmVudFR5cGUgPSBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmZpcmVFdmVudCAmJiBodG1sRXZlbnRzWydvbicrZXZlbnROYW1lXSkgey8vIElFIDwgOVxuICAgICAgICAgIGVsLmZpcmVFdmVudCgnb24nK2V2ZW50LmV2ZW50VHlwZSxldmVudCk7Ly8gY2FuIHRyaWdnZXIgb25seSByZWFsIGV2ZW50IChlLmcuICdjbGljaycpXG4gICAgICAgIH0gZWxzZSBpZiAoZWxbZXZlbnROYW1lXSl7XG4gICAgICAgICAgZWxbZXZlbnROYW1lXSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsWydvbicrZXZlbnROYW1lXSkge1xuICAgICAgICAgIGVsWydvbicrZXZlbnROYW1lXSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkRXZlbnQgOiBmdW5jdGlvbihlbCwgdHlwZSwgaGFuZGxlcil7XG4gICAgICAgIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLGhhbmRsZXIsZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmF0dGFjaEV2ZW50ICYmIGh0bWxFdmVudHNbJ29uJyt0eXBlXSl7Ly8gSUUgPCA5XG4gICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyt0eXBlLGhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsWydvbicrdHlwZV09aGFuZGxlcjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2ZW50IDogZnVuY3Rpb24oZWwsIHR5cGUsIGhhbmRsZXIpe1xuICAgICAgICBpZihlbC5yZW1vdmV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsaGFuZGxlcixmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWwuZGV0YWNoRXZlbnQgJiYgaHRtbEV2ZW50c1snb24nK3R5cGVdKXsvLyBJRSA8IDlcbiAgICAgICAgICBlbC5kZXRhY2hFdmVudCgnb24nK3R5cGUsaGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxbJ29uJyt0eXBlXT1udWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXNrIDogZnVuY3Rpb24oZWxlbSwgdmFsKSB7XG4gICAgICAvLyBlbGVtLnN0eWxlLmNsaXAgPSAncmVjdCgnK3ZhbCsnKSc7XG4gICAgfSxcbiAgICBnZXRQZXJjZW50YWdlIDogZnVuY3Rpb24obnVtLCBwZXJjZW50YWdlKSB7XG4gICAgICByZXR1cm4gKG51bSAvIDEwMCkgKiBwZXJjZW50YWdlO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBSZXR1cm4gcGl4ZWwgKyBwZXJjZW50IHZhbHVlcyBmcm9tIGludGVnZXIgLyBzdHJpbmcgLCBlZyAnMTAlJ1xuICAgICAqL1xuICAgIGdldFNpemVTdHlsZSA6IGZ1bmN0aW9uKHZhbCwgc2l6ZSkge1xuICAgICAgLy8gY29uc29sZS5sb2codmFsLCBzaXplKVxuICAgICAgdmFyIHRvb2xzID0gdGhpcy50b29scztcbiAgICAgIHZhciBwcm9jZXNzZWQgPSB7fTtcbiAgICAgIHZhciBudW0gPSBwYXJzZUludCh2YWwsIDEwKTtcbiAgICAgIHZhciB2YWwgPSB2YWwuc3BsaXQobnVtKVsxXTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIG51bSA6IChpc05hTihwYXJzZUZsb2F0KChudW0pKSkgPyAwIDogbnVtKSxcbiAgICAgICAgdmFsIDogKHR5cGVvZiB2YWwhPT0ndW5kZWZpbmVkJyA/IHZhbCA6ICdweCcpXG4gICAgICB9XG4gICAgICBpZiAoZGF0YS52YWw9PSclJykge1xuICAgICAgICBwcm9jZXNzZWRbJ3B4J10gPSBNYXRoLnJvdW5kKChzaXplIC8gMTAwKSAqIGRhdGEubnVtKTtcbiAgICAgICAgcHJvY2Vzc2VkWydwZXJjZW50J10gPSBkYXRhLm51bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3NlZFsncHgnXSA9IGRhdGEubnVtO1xuICAgICAgICBwcm9jZXNzZWRbJ3BlcmNlbnQnXSA9IGRhdGEubnVtIC8gc2l6ZSAqIDEwMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9jZXNzZWQ7XG4gICAgfSxcbiAgICBnZXRWaWV3cG9ydFNpemUgOiBmdW5jdGlvbih3KSB7XG4gICAgICAvLyBVc2UgdGhlIHNwZWNpZmllZCB3aW5kb3cgb3IgdGhlIGN1cnJlbnQgd2luZG93IGlmIG5vIGFyZ3VtZW50XG4gICAgICB3ID0gdyB8fCB3aW5kb3c7XG4gIFxuICAgICAgLy8gVGhpcyB3b3JrcyBmb3IgYWxsIGJyb3dzZXJzIGV4Y2VwdCBJRTggYW5kIGJlZm9yZVxuICAgICAgaWYgKHcuaW5uZXJXaWR0aCAhPSBudWxsKSByZXR1cm4geyB3OiB3LmlubmVyV2lkdGgsIGg6IHcuaW5uZXJIZWlnaHQgfTtcbiAgXG4gICAgICAvLyBGb3IgSUUgKG9yIGFueSBicm93c2VyKSBpbiBTdGFuZGFyZHMgbW9kZVxuICAgICAgdmFyIGQgPSB3LmRvY3VtZW50O1xuICAgICAgaWYgKGRvY3VtZW50LmNvbXBhdE1vZGUgPT0gXCJDU1MxQ29tcGF0XCIpXG4gICAgICAgICAgcmV0dXJuIHsgdzogZC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgaDogZC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IH07XG4gIFxuICAgICAgLy8gRm9yIGJyb3dzZXJzIGluIFF1aXJrcyBtb2RlXG4gICAgICByZXR1cm4geyB3OiBkLmJvZHkuY2xpZW50V2lkdGgsIGg6IGQuYm9keS5jbGllbnRIZWlnaHQgfTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogRXZlbnRzIGxpc3RcbiAgICogVGhpcyBtZXRob2QgaXMgbmV2ZXIgdXNlZCwgb25seSBoZXJlIGZvciBPTkUgdG8gcGFyc2VcbiAgICovXG4gIGN1c3RvbUFkLnByb3RvdHlwZS5kZWNsYXJlRXZlbnRzID0gZnVuY3Rpb24oYWR2ZXJ0KSB7XG4gICAgXG4gICAgLy8gQWR0ZWNoIGV2ZW50c1xuICAgIEFEVEVDSC5ldmVudCgnUllPVF9NRVRBJyk7XG4gICAgQURURUNILmV2ZW50KCdSWU9UX1JFU0laRScpO1xuICBcbiAgICAvLyBBZHRlY2ggbWV0aG9kcyBcbiAgICBBRFRFQ0guZXZlbnQoJ0ZJUkVfUllPVF9SRVNJWkUnKTtcbiAgXG4gIH07XG4gIFxuICAvKipcbiAgICogcHJlSW5pdCBNZXRob2RcbiAgICovXG4gIGN1c3RvbUFkLnByb3RvdHlwZS5wcmVJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdz09bnVsbCkgcmV0dXJuO1xuICAgIHdpbmRvdy5jb20gPSBjb20gfHwge307XG4gICAgY29tLmFkdGVjaCA9IHdpbmRvdy5jb20uYWR0ZWNoO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEluaXQgY3VzdG9tQWRcbiAgICovXG4gIGN1c3RvbUFkLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oYWR2ZXJ0KSB7XG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYWR2ZXJ0ID0gYWR2ZXJ0O1xuICBcbiAgICB0aGlzLmVsZW0uYWRDb250YWluZXIgPSBhZHZlcnQuYXNzZXRDb250YWluZXJzLm1haW4uYW5jaG9yRGl2O1xuICAgIHRoaXMuZWxlbS5hZENvbnRlbnQgPSBhZHZlcnQuYXNzZXRDb250YWluZXJzLm1haW4uYW5jaG9yRGl2LmZpcnN0Q2hpbGQ7XG4gICAgdGhpcy5lbGVtLmFkSWZyYW1lID0gdGhpcy5lbGVtLmFkQ29udGVudC5maXJzdENoaWxkO1xuICAgIHRoaXMuZWxlbS5hZEJvZHkgPSBkb2N1bWVudCB8fCB0aGlzLmVsZW0uYWRJZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgXG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5kYXRhLnV0aWxzID0gdGFyZ2V0V2luZG93LmNvbS5hZHRlY2guVXRpbHNfJFZFUlNJT04kO1xuICAgIHRoaXMuZGF0YS5nbG9iYWxFdmVudEJ1cyA9IHRhcmdldFdpbmRvdy5hZHRlY2hBZE1hbmFnZXJfJFZFUlNJT04kLmdsb2JhbEV2ZW50QnVzO1xuICAgIHRoaXMuZGF0YS5yaWNoTWVkaWFFdmVudCA9IHRhcmdldFdpbmRvdy5jb20uYWR0ZWNoLlJpY2hNZWRpYUV2ZW50XyRWRVJTSU9OJDtcbiAgXG4gICAgLy8gTWV0YSBkYXRhIHRvIHBhc3MgdG8gY2hpbGRcbiAgICB0aGlzLm1ldGFEYXRhID0ge307XG4gIFxuICAgIC8vIEdldCBkYXRhXG4gICAgdGhpcy5zZXR1cFNjcm9sbERhdGEoKTtcbiAgICAvLyB0aGlzLmdldElmcmFtZVBvc2l0aW9uKCk7XG4gIFxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJpY2hNZWRpYUV2ZW50ID0gbmV3IHNlbGYuZGF0YS5yaWNoTWVkaWFFdmVudCgnUllPVF9NRVRBJyk7XG4gICAgICByaWNoTWVkaWFFdmVudC5tZXRhID0ge1xuICAgICAgICBcIm1ldGFEYXRhXCIgOiBzZWxmLm1ldGFEYXRhXG4gICAgICB9O1xuICAgICAgc2VsZi5hZHZlcnQuZXZlbnRCdXMuZGlzcGF0Y2hFdmVudChyaWNoTWVkaWFFdmVudCk7XG4gICAgfSwgMTAwKTtcbiAgfTtcbiAgXG4gIGN1c3RvbUFkLnByb3RvdHlwZS5nZXRJZnJhbWVQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtLmlmcmFtZTtcbiAgICB2YXIgYm9keVJlY3QgPSB0aGlzLmVsZW0uYWRCb2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBlbGVtUmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHRvcCA9IGVsZW1SZWN0LnRvcCAtIGJvZHlSZWN0LnRvcDtcbiAgICAgICAgLy8gYm90dG9tID0gZWxlbVJlY3QudG9wIC0gYm9keVJlY3QudG9wLFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5UmVjdCwgZWxlbVJlY3QpXG4gICAgdGhpcy5tZXRhRGF0YS50b3BQb3NpdGlvbiA9IHRvcDtcbiAgfTtcbiAgXG4gIGN1c3RvbUFkLnByb3RvdHlwZS5zZXR1cFNjcm9sbERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB3aGVlbCwgZmFsc2UgKTtcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgdmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICByZXR1cm4gdG9wO1xuICAgIH1cbiAgICB2YXIgbGFzdE9mZnNldCA9IGdldFNjcm9sbFRvcCgpO1xuICAgIHZhciBsYXN0RGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGZ1bmN0aW9uIHdoZWVsKGUpIHtcbiAgICAgIHNlbGYubWV0YURhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgfVxuICAgIHRoaXMubWV0YURhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gIH07XG5cbiAgdGFyZ2V0V2luZG93LmFkdGVjaENhbGxiYWNrSW5zdGFuY2VzID0gdGFyZ2V0V2luZG93LmFkdGVjaENhbGxiYWNrSW5zdGFuY2VzIHx8IFtdO1xuICB2YXIgaW5zdGFuY2VJbmRleCA9IHRhcmdldFdpbmRvdy5hZHRlY2hDYWxsYmFja0luc3RhbmNlcy5sZW5ndGg7XG4gIHRhcmdldFdpbmRvdy5hZHRlY2hDYWxsYmFja0luc3RhbmNlc1tpbnN0YW5jZUluZGV4XSA9IG5ldyB0YXJnZXRXaW5kb3cuY29tLmFkdGVjaC5BZHRlY2hDdXN0b21BZCRBRF9JRCQoKTtcblxuICB0YXJnZXRXaW5kb3cuYWR0ZWNoQWRDYWxsYmFja3MgPSB0YXJnZXRXaW5kb3cuYWR0ZWNoQWRDYWxsYmFja3MgfHwge307XG4gIHRhcmdldFdpbmRvdy5hZHRlY2hBZENhbGxiYWNrc1thZENvbmZpZy5hZFNlcnZlclZhcnMudWlkXSA9XG4gICAgICB0YXJnZXRXaW5kb3cuYWR0ZWNoQWRDYWxsYmFja3NbYWRDb25maWcuYWRTZXJ2ZXJWYXJzLnVpZF0gfHwgW107XG4gIHRhcmdldFdpbmRvdy5hZHRlY2hBZENhbGxiYWNrc1thZENvbmZpZy5hZFNlcnZlclZhcnMudWlkXS5wdXNoKFxuICAgICAgdGFyZ2V0V2luZG93LmFkdGVjaENhbGxiYWNrSW5zdGFuY2VzW2luc3RhbmNlSW5kZXhdKTtcbn0pKGFkdGVjaEFkQ29uZmlnKTsiXX0=
