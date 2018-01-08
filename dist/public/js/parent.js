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
      // console.log(data)
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
    if (height!==this.data.height) {
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
  removeFromQueue : function() {},
  checkForProcessedEvents : function() {
    var eventQueue = this.queue;
    for (var i = 0; i < eventQueue.length; i++) {
      if (eventQueue.indexOf(eventQueue[i]) == 0) {
        this.data.eventQueue.splice(i, 1);
      }
    }
  },
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicGFyZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgUG9seWZpbGxcbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICB9O1xufSkoKTtcblxuLypcbiAqIFJZT1QgQ29udGVudCBCb290c3RyYXAgUEFSRU5UXG4gKi9cblxuLypcbiAqIENvbnN0cnVjdG9yXG4gKi9cbnZhciAkcnlvdFBhcmVudCA9IGZ1bmN0aW9uKGlmcmFtZSkge1xuICB0aGlzLmlmcmFtZSA9IGlmcmFtZTtcbiAgdGhpcy5ldmVudEJ1cyA9IG5ldyB0aGlzLmV2ZW50QnVzKHRoaXMuZGF0YSk7XG4gIHRoaXMuaW5pdCgpO1xufTtcblxuJHJ5b3RQYXJlbnQucHJvdG90eXBlID0ge1xuICBkYXRhIDoge1xuICAgIHRvcFBvc2l0aW9uIDogMCxcbiAgICBzY3JvbGxUb3AgOiAwLFxuICAgIHdpbldpZHRoIDogMCxcbiAgICB3aW5IZWlnaHQgOiAwLFxuICB9LFxuICByZWNlaXZlZERhdGEgOiB7fSxcbiAgaW5pdCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIEdldCBkYXRhXG4gICAgdGhpcy5zZXR1cFNjcm9sbERhdGEoKTtcbiAgICB0aGlzLmdldElmcmFtZVBvc2l0aW9uKCk7XG4gICAgLy8gQXR0YWNoIHJlc2l6ZSBsaXN0ZW5lclxuICAgIHRoaXMuc2V0dXBSZXNpemUoKTtcbiAgICAvLyBBdHRhY2ggZGF0YSBzZW5kIC8gcmVjaWV2ZVxuICAgIHRoaXMuc2V0dXBTZW5kKCk7XG4gICAgdGhpcy5zZXR1cFJlY2lldmVyKCk7XG4gIH0sXG4gIHNldHVwU2VuZCA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkYXRhID0gc2VsZi5kYXRhO1xuICAgICAgICAgIGRhdGEuZXZlbnRzUXVldWUgPSBzZWxmLmV2ZW50QnVzLnF1ZXVlO1xuICAgICAgdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShzdHIudG9TdHJpbmcoKSwgJyonKTtcbiAgICB9LCA1MCk7XG4gIH0sXG4gIHNldHVwUmVjaWV2ZXIgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gQ3JlYXRlIElFICsgb3RoZXJzIGNvbXBhdGlibGUgZXZlbnQgaGFuZGxlclxuICAgIHZhciBldmVudE1ldGhvZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gXCJhZGRFdmVudExpc3RlbmVyXCIgOiBcImF0dGFjaEV2ZW50XCI7XG4gICAgdmFyIGV2ZW50ZXIgPSB3aW5kb3dbZXZlbnRNZXRob2RdO1xuICAgIHZhciBtZXNzYWdlRXZlbnQgPSBldmVudE1ldGhvZCA9PSBcImF0dGFjaEV2ZW50XCIgPyBcIm9ubWVzc2FnZVwiIDogXCJtZXNzYWdlXCI7XG4gICAgLy8gTGlzdGVuIHRvIG1lc3NhZ2UgZnJvbSBjaGlsZCB3aW5kb3dcbiAgICBldmVudGVyKG1lc3NhZ2VFdmVudCxmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgIHNlbGYuc2V0SWZyYW1lSGVpZ2h0KGRhdGEuZG9jSGVpZ2h0KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgfSxmYWxzZSk7XG4gIH0sXG4gIHNldHVwUmVzaXplIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB3aW5TaXplID0gc2VsZi5nZXRXaW5kb3dTaXplKCk7XG4gICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICBzZWxmLmRhdGEud2luSGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgd2luU2l6ZSA9IHNlbGYuZ2V0V2luZG93U2l6ZSgpO1xuICAgICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICAgIHNlbGYuZGF0YS53aW5IZWlnaHQgPSB3aW5TaXplLmhlaWdodDtcbiAgICAgIHNlbGYuZXZlbnRCdXMuYWRkVG9RdWV1ZSgncmVzaXplJyk7XG4gICAgfSwgdHJ1ZSk7XG4gIH0sXG4gIGdldFdpbmRvd1NpemUgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdyA9IHdpbmRvdyxcbiAgICAgICAgZCA9IGRvY3VtZW50LFxuICAgICAgICBlID0gZC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIGcgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXG4gICAgICAgIHggPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoLFxuICAgICAgICB5ID0gdy5pbm5lckhlaWdodHx8IGUuY2xpZW50SGVpZ2h0fHwgZy5jbGllbnRIZWlnaHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoIDogeCxcbiAgICAgIGhlaWdodCA6IHlcbiAgICB9O1xuICB9LFxuICBzZXRJZnJhbWVIZWlnaHQgOiBmdW5jdGlvbihoZWlnaHQpIHtcbiAgICBpZiAoaGVpZ2h0IT09dGhpcy5kYXRhLmhlaWdodCkge1xuICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgfSxcbiAgZ2V0SWZyYW1lUG9zaXRpb24gOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgIHZhciBib2R5UmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIGVsZW1SZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgdG9wID0gZWxlbVJlY3QudG9wIC0gYm9keVJlY3QudG9wO1xuICAgICAgICAvLyBib3R0b20gPSBlbGVtUmVjdC50b3AgLSBib2R5UmVjdC50b3AsXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvZHlSZWN0LCBlbGVtUmVjdClcbiAgICB0aGlzLmRhdGEudG9wUG9zaXRpb24gPSB0b3A7XG4gIH0sXG4gIHNldHVwU2Nyb2xsRGF0YSA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHdoZWVsLCBmYWxzZSApO1xuICAgIGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB2YXIgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICAgIHJldHVybiB0b3A7XG4gICAgfVxuICAgIHZhciBsYXN0T2Zmc2V0ID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgdmFyIGxhc3REYXRlID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgZnVuY3Rpb24gd2hlZWwoZSkge1xuICAgICAgc2VsZi5kYXRhLnNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcCgpO1xuICAgIH1cbiAgICB0aGlzLmRhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gIH1cbn07XG5cbi8qXG4gKiBFdmVudHMgbWFuYWdlbWVudCBidXNcbiAqL1xuJHJ5b3RQYXJlbnQucHJvdG90eXBlLmV2ZW50QnVzID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLnBhcmVudERhdGEgPSBkYXRhO1xufVxuJHJ5b3RQYXJlbnQucHJvdG90eXBlLmV2ZW50QnVzLnByb3RvdHlwZSA9IHtcbiAgcXVldWUgOiB7fSxcbiAgcHJvY2Vzc2VkIDoge30sXG4gIGFkZFRvUXVldWUgOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICB2YXIgZXZlbnRRdWV1ZSA9IHRoaXMucXVldWU7XG4gICAgdmFyIHNpemUgPSBPYmplY3Qua2V5cyhldmVudFF1ZXVlKS5sZW5ndGg7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50UXVldWUpIHtcbiAgICAgIGlmIChldmVudFF1ZXVlW2tleV0gPT0gZXZlbnROYW1lKSB7XG4gICAgICAgIC8vIElmIGV4aXN0cywgZG9uJ3QgYWRkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkXG4gICAgdGhpcy5xdWV1ZVtzaXplXSA9IGV2ZW50TmFtZTtcbiAgfSxcbiAgcmVtb3ZlRnJvbVF1ZXVlIDogZnVuY3Rpb24oKSB7fSxcbiAgY2hlY2tGb3JQcm9jZXNzZWRFdmVudHMgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnRRdWV1ZSA9IHRoaXMucXVldWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudFF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRRdWV1ZS5pbmRleE9mKGV2ZW50UXVldWVbaV0pID09IDApIHtcbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50UXVldWUuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn07Il19
