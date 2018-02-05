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
  this.eventBus = new this.eventBus(this.data, iframe);
  this.init();
};

$ryotParent.prototype = {
  data : {
    topPosition : 0,
    scrollTop : 0,
    winWidth : 0,
    winHeight : 0,
    docHeight : 0,
  },
  receivedData : {},
  init : function() {
    // Get data
    this.setupScrollData();
    this.getIframePosition();
    // Attach resize listener
    this.setupResize();
    // Attach data send / recieve
    this.setupSend();
    this.setupReciever();
  },
  setupSend : function() {
    var self = this;
    setInterval(function() {
      var data = self.data;
          data.eventsQueue = self.eventBus.queue;
          // data.eventsProcessed = self.eventBus.processed;
          // console.log(data)
      var str = JSON.stringify(data);
      self.iframe.contentWindow.postMessage(str.toString(), '*');
    }, 50);
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
      self.data.docHeight = data.docHeight;
      self.eventBus.checkForProcessedEvents(data.processedEvents);
    },false);
  },
  setupResize : function() {
    var self = this;
    var winSize = self.getWindowSize();
    self.data.winWidth = winSize.width;
    self.data.winHeight = winSize.height;
    window.addEventListener('resize', function(){
      var winSize = self.getWindowSize();
      self.data.winWidth = winSize.width;
      self.data.winHeight = winSize.height;
      self.setIframeHeight(self.data.docHeight);
      self.eventBus.addToQueue('resize');
    }, true);
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
  setIframeHeight : function(height) {
    if (height!==this.data.docHeight) {
      this.iframe.style.height = 0 + "px";
      this.iframe.style.height = height + "px";
    }
  },
  getIframePosition : function() {
    var element = this.iframe;
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        top = elemRect.top - bodyRect.top;
    this.data.topPosition = top;
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
    this.data.scrollTop = getScrollTop();
  }
};
/*
 * Events management bus
 */
$ryotParent.prototype.eventBus = function(data, parentIframe) {
  this.parentData = data;
  this.iframe = parentIframe;
  this.ADTECH = this.iframe.contentWindow.ADTECH;
  console.log(this.ADTECH);
  // console.log(this.ADTECH.mraid.addEventListener);
  // console.log(this.ADTECH);
  // console.log(this.ADTECH.eventTypes);
}
$ryotParent.prototype.eventBus.prototype = {
  queue : {},
  processed : {},
  addToQueue : function(eventName, data) {
    var eventQueue = this.queue;
    var size = Object.keys(eventQueue).length;
    for (var key in eventQueue) {
      if (eventQueue[key] == eventName) {
        // If exists, don't add
        return;
      }
    }
    // Add
    this.queue[size] = eventName;
  },
  removeFromQueue : function(eventName) {},
  checkForProcessedEvents : function(data) {
    var processed = data;
    var queue = this.queue;
    for (var key in processed) {
      var exists = this.findInQueue(processed[key]);
      if (exists) {
        delete queue[exists];
      }
    }
  },
  findInQueue : function(eventName) {
    for (var key in this.queue) {
      if (eventName == this.queue[key]) return key;
    }
    return false;
  }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyIsInBhcmVudC5ldmVudEJ1cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwYXJlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBQb2x5ZmlsbFxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICBmdW5jdGlvbiggY2FsbGJhY2sgKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgIH07XG59KSgpO1xuXG4vKlxuICogUllPVCBDb250ZW50IEJvb3RzdHJhcCBQQVJFTlRcbiAqL1xuXG4vKlxuICogQ29uc3RydWN0b3JcbiAqL1xudmFyICRyeW90UGFyZW50ID0gZnVuY3Rpb24oaWZyYW1lKSB7XG4gIHRoaXMuaWZyYW1lID0gaWZyYW1lO1xuICB0aGlzLmV2ZW50QnVzID0gbmV3IHRoaXMuZXZlbnRCdXModGhpcy5kYXRhLCBpZnJhbWUpO1xuICB0aGlzLmluaXQoKTtcbn07XG5cbiRyeW90UGFyZW50LnByb3RvdHlwZSA9IHtcbiAgZGF0YSA6IHtcbiAgICB0b3BQb3NpdGlvbiA6IDAsXG4gICAgc2Nyb2xsVG9wIDogMCxcbiAgICB3aW5XaWR0aCA6IDAsXG4gICAgd2luSGVpZ2h0IDogMCxcbiAgICBkb2NIZWlnaHQgOiAwLFxuICB9LFxuICByZWNlaXZlZERhdGEgOiB7fSxcbiAgaW5pdCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIEdldCBkYXRhXG4gICAgdGhpcy5zZXR1cFNjcm9sbERhdGEoKTtcbiAgICB0aGlzLmdldElmcmFtZVBvc2l0aW9uKCk7XG4gICAgLy8gQXR0YWNoIHJlc2l6ZSBsaXN0ZW5lclxuICAgIHRoaXMuc2V0dXBSZXNpemUoKTtcbiAgICAvLyBBdHRhY2ggZGF0YSBzZW5kIC8gcmVjaWV2ZVxuICAgIHRoaXMuc2V0dXBTZW5kKCk7XG4gICAgdGhpcy5zZXR1cFJlY2lldmVyKCk7XG4gIH0sXG4gIHNldHVwU2VuZCA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkYXRhID0gc2VsZi5kYXRhO1xuICAgICAgICAgIGRhdGEuZXZlbnRzUXVldWUgPSBzZWxmLmV2ZW50QnVzLnF1ZXVlO1xuICAgICAgICAgIC8vIGRhdGEuZXZlbnRzUHJvY2Vzc2VkID0gc2VsZi5ldmVudEJ1cy5wcm9jZXNzZWQ7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgIHNlbGYuaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2Uoc3RyLnRvU3RyaW5nKCksICcqJyk7XG4gICAgfSwgNTApO1xuICB9LFxuICBzZXR1cFJlY2lldmVyIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIENyZWF0ZSBJRSArIG90aGVycyBjb21wYXRpYmxlIGV2ZW50IGhhbmRsZXJcbiAgICB2YXIgZXZlbnRNZXRob2QgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/IFwiYWRkRXZlbnRMaXN0ZW5lclwiIDogXCJhdHRhY2hFdmVudFwiO1xuICAgIHZhciBldmVudGVyID0gd2luZG93W2V2ZW50TWV0aG9kXTtcbiAgICB2YXIgbWVzc2FnZUV2ZW50ID0gZXZlbnRNZXRob2QgPT0gXCJhdHRhY2hFdmVudFwiID8gXCJvbm1lc3NhZ2VcIiA6IFwibWVzc2FnZVwiO1xuICAgIC8vIExpc3RlbiB0byBtZXNzYWdlIGZyb20gY2hpbGQgd2luZG93XG4gICAgZXZlbnRlcihtZXNzYWdlRXZlbnQsZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICBzZWxmLnNldElmcmFtZUhlaWdodChkYXRhLmRvY0hlaWdodCk7XG4gICAgICBzZWxmLmRhdGEuZG9jSGVpZ2h0ID0gZGF0YS5kb2NIZWlnaHQ7XG4gICAgICBzZWxmLmV2ZW50QnVzLmNoZWNrRm9yUHJvY2Vzc2VkRXZlbnRzKGRhdGEucHJvY2Vzc2VkRXZlbnRzKTtcbiAgICB9LGZhbHNlKTtcbiAgfSxcbiAgc2V0dXBSZXNpemUgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHdpblNpemUgPSBzZWxmLmdldFdpbmRvd1NpemUoKTtcbiAgICBzZWxmLmRhdGEud2luV2lkdGggPSB3aW5TaXplLndpZHRoO1xuICAgIHNlbGYuZGF0YS53aW5IZWlnaHQgPSB3aW5TaXplLmhlaWdodDtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB3aW5TaXplID0gc2VsZi5nZXRXaW5kb3dTaXplKCk7XG4gICAgICBzZWxmLmRhdGEud2luV2lkdGggPSB3aW5TaXplLndpZHRoO1xuICAgICAgc2VsZi5kYXRhLndpbkhlaWdodCA9IHdpblNpemUuaGVpZ2h0O1xuICAgICAgc2VsZi5zZXRJZnJhbWVIZWlnaHQoc2VsZi5kYXRhLmRvY0hlaWdodCk7XG4gICAgICBzZWxmLmV2ZW50QnVzLmFkZFRvUXVldWUoJ3Jlc2l6ZScpO1xuICAgIH0sIHRydWUpO1xuICB9LFxuICBnZXRXaW5kb3dTaXplIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHcgPSB3aW5kb3csXG4gICAgICAgIGQgPSBkb2N1bWVudCxcbiAgICAgICAgZSA9IGQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBnID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLFxuICAgICAgICB4ID0gdy5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aCxcbiAgICAgICAgeSA9IHcuaW5uZXJIZWlnaHR8fCBlLmNsaWVudEhlaWdodHx8IGcuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCA6IHgsXG4gICAgICBoZWlnaHQgOiB5XG4gICAgfTtcbiAgfSxcbiAgc2V0SWZyYW1lSGVpZ2h0IDogZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgaWYgKGhlaWdodCE9PXRoaXMuZGF0YS5kb2NIZWlnaHQpIHtcbiAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmhlaWdodCA9IDAgKyBcInB4XCI7XG4gICAgICB0aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgfVxuICB9LFxuICBnZXRJZnJhbWVQb3NpdGlvbiA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5pZnJhbWU7XG4gICAgdmFyIGJvZHlSZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgZWxlbVJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICB0b3AgPSBlbGVtUmVjdC50b3AgLSBib2R5UmVjdC50b3A7XG4gICAgdGhpcy5kYXRhLnRvcFBvc2l0aW9uID0gdG9wO1xuICB9LFxuICBzZXR1cFNjcm9sbERhdGEgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB3aGVlbCwgZmFsc2UgKTtcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgdmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICByZXR1cm4gdG9wO1xuICAgIH1cbiAgICB2YXIgbGFzdE9mZnNldCA9IGdldFNjcm9sbFRvcCgpO1xuICAgIHZhciBsYXN0RGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGZ1bmN0aW9uIHdoZWVsKGUpIHtcbiAgICAgIHNlbGYuZGF0YS5zY3JvbGxUb3AgPSBnZXRTY3JvbGxUb3AoKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhLnNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcCgpO1xuICB9XG59OyIsIi8qXG4gKiBFdmVudHMgbWFuYWdlbWVudCBidXNcbiAqL1xuJHJ5b3RQYXJlbnQucHJvdG90eXBlLmV2ZW50QnVzID0gZnVuY3Rpb24oZGF0YSwgcGFyZW50SWZyYW1lKSB7XG4gIHRoaXMucGFyZW50RGF0YSA9IGRhdGE7XG4gIHRoaXMuaWZyYW1lID0gcGFyZW50SWZyYW1lO1xuICB0aGlzLkFEVEVDSCA9IHRoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3cuQURURUNIO1xuICBjb25zb2xlLmxvZyh0aGlzLkFEVEVDSCk7XG4gIC8vIGNvbnNvbGUubG9nKHRoaXMuQURURUNILm1yYWlkLmFkZEV2ZW50TGlzdGVuZXIpO1xuICAvLyBjb25zb2xlLmxvZyh0aGlzLkFEVEVDSCk7XG4gIC8vIGNvbnNvbGUubG9nKHRoaXMuQURURUNILmV2ZW50VHlwZXMpO1xufVxuJHJ5b3RQYXJlbnQucHJvdG90eXBlLmV2ZW50QnVzLnByb3RvdHlwZSA9IHtcbiAgcXVldWUgOiB7fSxcbiAgcHJvY2Vzc2VkIDoge30sXG4gIGFkZFRvUXVldWUgOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICB2YXIgZXZlbnRRdWV1ZSA9IHRoaXMucXVldWU7XG4gICAgdmFyIHNpemUgPSBPYmplY3Qua2V5cyhldmVudFF1ZXVlKS5sZW5ndGg7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50UXVldWUpIHtcbiAgICAgIGlmIChldmVudFF1ZXVlW2tleV0gPT0gZXZlbnROYW1lKSB7XG4gICAgICAgIC8vIElmIGV4aXN0cywgZG9uJ3QgYWRkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkXG4gICAgdGhpcy5xdWV1ZVtzaXplXSA9IGV2ZW50TmFtZTtcbiAgfSxcbiAgcmVtb3ZlRnJvbVF1ZXVlIDogZnVuY3Rpb24oZXZlbnROYW1lKSB7fSxcbiAgY2hlY2tGb3JQcm9jZXNzZWRFdmVudHMgOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHByb2Nlc3NlZCA9IGRhdGE7XG4gICAgdmFyIHF1ZXVlID0gdGhpcy5xdWV1ZTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvY2Vzc2VkKSB7XG4gICAgICB2YXIgZXhpc3RzID0gdGhpcy5maW5kSW5RdWV1ZShwcm9jZXNzZWRba2V5XSk7XG4gICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgIGRlbGV0ZSBxdWV1ZVtleGlzdHNdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmluZEluUXVldWUgOiBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5xdWV1ZSkge1xuICAgICAgaWYgKGV2ZW50TmFtZSA9PSB0aGlzLnF1ZXVlW2tleV0pIHJldHVybiBrZXk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTsiXX0=
