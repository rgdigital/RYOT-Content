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
  this.eventBus = new this.eventBus(this.data);
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
        // bottom = elemRect.top - bodyRect.top,
        // console.log(bodyRect, elemRect)
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
$ryotParent.prototype.eventBus = function(data) {
  this.parentData = data;
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
    // console.log(queue, processed)
  },
  findInQueue : function(eventName) {
    for (var key in this.queue) {
      if (eventName == this.queue[key]) return key;
    }
    return false;
  }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyIsInBhcmVudC5ldmVudEJ1cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwYXJlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBQb2x5ZmlsbFxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICBmdW5jdGlvbiggY2FsbGJhY2sgKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgIH07XG59KSgpO1xuXG4vKlxuICogUllPVCBDb250ZW50IEJvb3RzdHJhcCBQQVJFTlRcbiAqL1xuXG4vKlxuICogQ29uc3RydWN0b3JcbiAqL1xudmFyICRyeW90UGFyZW50ID0gZnVuY3Rpb24oaWZyYW1lKSB7XG4gIHRoaXMuaWZyYW1lID0gaWZyYW1lO1xuICB0aGlzLmV2ZW50QnVzID0gbmV3IHRoaXMuZXZlbnRCdXModGhpcy5kYXRhKTtcbiAgdGhpcy5pbml0KCk7XG59O1xuXG4kcnlvdFBhcmVudC5wcm90b3R5cGUgPSB7XG4gIGRhdGEgOiB7XG4gICAgdG9wUG9zaXRpb24gOiAwLFxuICAgIHNjcm9sbFRvcCA6IDAsXG4gICAgd2luV2lkdGggOiAwLFxuICAgIHdpbkhlaWdodCA6IDAsXG4gICAgZG9jSGVpZ2h0IDogMCxcbiAgfSxcbiAgcmVjZWl2ZWREYXRhIDoge30sXG4gIGluaXQgOiBmdW5jdGlvbigpIHtcbiAgICAvLyBHZXQgZGF0YVxuICAgIHRoaXMuc2V0dXBTY3JvbGxEYXRhKCk7XG4gICAgdGhpcy5nZXRJZnJhbWVQb3NpdGlvbigpO1xuICAgIC8vIEF0dGFjaCByZXNpemUgbGlzdGVuZXJcbiAgICB0aGlzLnNldHVwUmVzaXplKCk7XG4gICAgLy8gQXR0YWNoIGRhdGEgc2VuZCAvIHJlY2lldmVcbiAgICB0aGlzLnNldHVwU2VuZCgpO1xuICAgIHRoaXMuc2V0dXBSZWNpZXZlcigpO1xuICB9LFxuICBzZXR1cFNlbmQgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGF0YSA9IHNlbGYuZGF0YTtcbiAgICAgICAgICBkYXRhLmV2ZW50c1F1ZXVlID0gc2VsZi5ldmVudEJ1cy5xdWV1ZTtcbiAgICAgICAgICAvLyBkYXRhLmV2ZW50c1Byb2Nlc3NlZCA9IHNlbGYuZXZlbnRCdXMucHJvY2Vzc2VkO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHN0ci50b1N0cmluZygpLCAnKicpO1xuICAgIH0sIDUwKTtcbiAgfSxcbiAgc2V0dXBSZWNpZXZlciA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBDcmVhdGUgSUUgKyBvdGhlcnMgY29tcGF0aWJsZSBldmVudCBoYW5kbGVyXG4gICAgdmFyIGV2ZW50TWV0aG9kID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyBcImFkZEV2ZW50TGlzdGVuZXJcIiA6IFwiYXR0YWNoRXZlbnRcIjtcbiAgICB2YXIgZXZlbnRlciA9IHdpbmRvd1tldmVudE1ldGhvZF07XG4gICAgdmFyIG1lc3NhZ2VFdmVudCA9IGV2ZW50TWV0aG9kID09IFwiYXR0YWNoRXZlbnRcIiA/IFwib25tZXNzYWdlXCIgOiBcIm1lc3NhZ2VcIjtcbiAgICAvLyBMaXN0ZW4gdG8gbWVzc2FnZSBmcm9tIGNoaWxkIHdpbmRvd1xuICAgIGV2ZW50ZXIobWVzc2FnZUV2ZW50LGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgICAgc2VsZi5zZXRJZnJhbWVIZWlnaHQoZGF0YS5kb2NIZWlnaHQpO1xuICAgICAgc2VsZi5kYXRhLmRvY0hlaWdodCA9IGRhdGEuZG9jSGVpZ2h0O1xuICAgICAgc2VsZi5ldmVudEJ1cy5jaGVja0ZvclByb2Nlc3NlZEV2ZW50cyhkYXRhLnByb2Nlc3NlZEV2ZW50cyk7XG4gICAgfSxmYWxzZSk7XG4gIH0sXG4gIHNldHVwUmVzaXplIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB3aW5TaXplID0gc2VsZi5nZXRXaW5kb3dTaXplKCk7XG4gICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICBzZWxmLmRhdGEud2luSGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgd2luU2l6ZSA9IHNlbGYuZ2V0V2luZG93U2l6ZSgpO1xuICAgICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICAgIHNlbGYuZGF0YS53aW5IZWlnaHQgPSB3aW5TaXplLmhlaWdodDtcbiAgICAgIHNlbGYuc2V0SWZyYW1lSGVpZ2h0KHNlbGYuZGF0YS5kb2NIZWlnaHQpO1xuICAgICAgc2VsZi5ldmVudEJ1cy5hZGRUb1F1ZXVlKCdyZXNpemUnKTtcbiAgICB9LCB0cnVlKTtcbiAgfSxcbiAgZ2V0V2luZG93U2l6ZSA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3ID0gd2luZG93LFxuICAgICAgICBkID0gZG9jdW1lbnQsXG4gICAgICAgIGUgPSBkLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcbiAgICAgICAgeCA9IHcuaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGgsXG4gICAgICAgIHkgPSB3LmlubmVySGVpZ2h0fHwgZS5jbGllbnRIZWlnaHR8fCBnLmNsaWVudEhlaWdodDtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGggOiB4LFxuICAgICAgaGVpZ2h0IDogeVxuICAgIH07XG4gIH0sXG4gIHNldElmcmFtZUhlaWdodCA6IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgIGlmIChoZWlnaHQhPT10aGlzLmRhdGEuZG9jSGVpZ2h0KSB7XG4gICAgICB0aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSAwICsgXCJweFwiO1xuICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgfSxcbiAgZ2V0SWZyYW1lUG9zaXRpb24gOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgIHZhciBib2R5UmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIGVsZW1SZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgdG9wID0gZWxlbVJlY3QudG9wIC0gYm9keVJlY3QudG9wO1xuICAgICAgICAvLyBib3R0b20gPSBlbGVtUmVjdC50b3AgLSBib2R5UmVjdC50b3AsXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvZHlSZWN0LCBlbGVtUmVjdClcbiAgICB0aGlzLmRhdGEudG9wUG9zaXRpb24gPSB0b3A7XG4gIH0sXG4gIHNldHVwU2Nyb2xsRGF0YSA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHdoZWVsLCBmYWxzZSApO1xuICAgIGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB2YXIgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICAgIHJldHVybiB0b3A7XG4gICAgfVxuICAgIHZhciBsYXN0T2Zmc2V0ID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgdmFyIGxhc3REYXRlID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgZnVuY3Rpb24gd2hlZWwoZSkge1xuICAgICAgc2VsZi5kYXRhLnNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcCgpO1xuICAgIH1cbiAgICB0aGlzLmRhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gIH1cbn07IiwiLypcbiAqIEV2ZW50cyBtYW5hZ2VtZW50IGJ1c1xuICovXG4kcnlvdFBhcmVudC5wcm90b3R5cGUuZXZlbnRCdXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMucGFyZW50RGF0YSA9IGRhdGE7XG59XG4kcnlvdFBhcmVudC5wcm90b3R5cGUuZXZlbnRCdXMucHJvdG90eXBlID0ge1xuICBxdWV1ZSA6IHt9LFxuICBwcm9jZXNzZWQgOiB7fSxcbiAgYWRkVG9RdWV1ZSA6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIHZhciBldmVudFF1ZXVlID0gdGhpcy5xdWV1ZTtcbiAgICB2YXIgc2l6ZSA9IE9iamVjdC5rZXlzKGV2ZW50UXVldWUpLmxlbmd0aDtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRRdWV1ZSkge1xuICAgICAgaWYgKGV2ZW50UXVldWVba2V5XSA9PSBldmVudE5hbWUpIHtcbiAgICAgICAgLy8gSWYgZXhpc3RzLCBkb24ndCBhZGRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBZGRcbiAgICB0aGlzLnF1ZXVlW3NpemVdID0gZXZlbnROYW1lO1xuICB9LFxuICByZW1vdmVGcm9tUXVldWUgOiBmdW5jdGlvbihldmVudE5hbWUpIHt9LFxuICBjaGVja0ZvclByb2Nlc3NlZEV2ZW50cyA6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcHJvY2Vzc2VkID0gZGF0YTtcbiAgICB2YXIgcXVldWUgPSB0aGlzLnF1ZXVlO1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9jZXNzZWQpIHtcbiAgICAgIHZhciBleGlzdHMgPSB0aGlzLmZpbmRJblF1ZXVlKHByb2Nlc3NlZFtrZXldKTtcbiAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgZGVsZXRlIHF1ZXVlW2V4aXN0c107XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHF1ZXVlLCBwcm9jZXNzZWQpXG4gIH0sXG4gIGZpbmRJblF1ZXVlIDogZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMucXVldWUpIHtcbiAgICAgIGlmIChldmVudE5hbWUgPT0gdGhpcy5xdWV1ZVtrZXldKSByZXR1cm4ga2V5O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07Il19
