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
  data : {
    eventQueue : [],
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
      var str = JSON.stringify(self.data);
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
    },false);
  },
  eventBus : {
    queue : {},
    processed : {},
    addToQueue : function(eventName, data) {

      return {
        eventName : eventName,
        data : data,
        key : key
      }
    },
    removeFromQueue : function() {},
    checkForProcessedEvents : function() {},
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
      self.addToEventQueue('resize');
    }, true);
  },
  addToEventQueue : function(eventName) {
    var eventQueue = this.data.eventQueue;
    for (var i = 0; i < eventQueue.length; i++) {
      if (eventQueue[i] == eventName) {
        // If exists, don't add
        return;
      }
    }
    // Add
    this.data.eventQueue.push(eventName);
  },
  checkForProcessedEvents : function(eventQueue) {
    for (var i = 0; i < eventQueue.length; i++) {
      if (eventQueue.indexOf(eventQueue[i]) == 0) {
        this.data.eventQueue.splice(i, 1);
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicGFyZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgUG9seWZpbGxcbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICB9O1xufSkoKTtcblxuLypcbiAqIFJZT1QgQ29udGVudCBCb290c3RyYXAgUEFSRU5UXG4gKi9cblxuLypcbiAqIENvbnN0cnVjdG9yXG4gKi9cbnZhciAkcnlvdFBhcmVudCA9IGZ1bmN0aW9uKGlmcmFtZSkge1xuICB0aGlzLmlmcmFtZSA9IGlmcmFtZTtcbiAgdGhpcy5pbml0KCk7XG59O1xuXG4kcnlvdFBhcmVudC5wcm90b3R5cGUgPSB7XG4gIGRhdGEgOiB7XG4gICAgZXZlbnRRdWV1ZSA6IFtdLFxuICAgIHRvcFBvc2l0aW9uIDogMCxcbiAgICBzY3JvbGxUb3AgOiAwLFxuICAgIHdpbldpZHRoIDogMCxcbiAgICB3aW5IZWlnaHQgOiAwLFxuICB9LFxuICByZWNlaXZlZERhdGEgOiB7fSxcbiAgaW5pdCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIEdldCBkYXRhXG4gICAgdGhpcy5zZXR1cFNjcm9sbERhdGEoKTtcbiAgICB0aGlzLmdldElmcmFtZVBvc2l0aW9uKCk7XG4gICAgLy8gQXR0YWNoIHJlc2l6ZSBsaXN0ZW5lclxuICAgIHRoaXMuc2V0dXBSZXNpemUoKTtcbiAgICAvLyBBdHRhY2ggZGF0YSBzZW5kIC8gcmVjaWV2ZVxuICAgIHRoaXMuc2V0dXBTZW5kKCk7XG4gICAgdGhpcy5zZXR1cFJlY2lldmVyKCk7XG4gIH0sXG4gIHNldHVwU2VuZCA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShzZWxmLmRhdGEpO1xuICAgICAgc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShzdHIudG9TdHJpbmcoKSwgJyonKTtcbiAgICB9LCA1MCk7XG4gIH0sXG4gIHNldHVwUmVjaWV2ZXIgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gQ3JlYXRlIElFICsgb3RoZXJzIGNvbXBhdGlibGUgZXZlbnQgaGFuZGxlclxuICAgIHZhciBldmVudE1ldGhvZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gXCJhZGRFdmVudExpc3RlbmVyXCIgOiBcImF0dGFjaEV2ZW50XCI7XG4gICAgdmFyIGV2ZW50ZXIgPSB3aW5kb3dbZXZlbnRNZXRob2RdO1xuICAgIHZhciBtZXNzYWdlRXZlbnQgPSBldmVudE1ldGhvZCA9PSBcImF0dGFjaEV2ZW50XCIgPyBcIm9ubWVzc2FnZVwiIDogXCJtZXNzYWdlXCI7XG4gICAgLy8gTGlzdGVuIHRvIG1lc3NhZ2UgZnJvbSBjaGlsZCB3aW5kb3dcbiAgICBldmVudGVyKG1lc3NhZ2VFdmVudCxmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgIHNlbGYuc2V0SWZyYW1lSGVpZ2h0KGRhdGEuZG9jSGVpZ2h0KTtcbiAgICB9LGZhbHNlKTtcbiAgfSxcbiAgZXZlbnRCdXMgOiB7XG4gICAgcXVldWUgOiB7fSxcbiAgICBwcm9jZXNzZWQgOiB7fSxcbiAgICBhZGRUb1F1ZXVlIDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGV2ZW50TmFtZSA6IGV2ZW50TmFtZSxcbiAgICAgICAgZGF0YSA6IGRhdGEsXG4gICAgICAgIGtleSA6IGtleVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlRnJvbVF1ZXVlIDogZnVuY3Rpb24oKSB7fSxcbiAgICBjaGVja0ZvclByb2Nlc3NlZEV2ZW50cyA6IGZ1bmN0aW9uKCkge30sXG4gIH0sXG4gIHNldHVwUmVzaXplIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB3aW5TaXplID0gc2VsZi5nZXRXaW5kb3dTaXplKCk7XG4gICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICBzZWxmLmRhdGEud2luSGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgd2luU2l6ZSA9IHNlbGYuZ2V0V2luZG93U2l6ZSgpO1xuICAgICAgc2VsZi5kYXRhLndpbldpZHRoID0gd2luU2l6ZS53aWR0aDtcbiAgICAgIHNlbGYuZGF0YS53aW5IZWlnaHQgPSB3aW5TaXplLmhlaWdodDtcbiAgICAgIHNlbGYuYWRkVG9FdmVudFF1ZXVlKCdyZXNpemUnKTtcbiAgICB9LCB0cnVlKTtcbiAgfSxcbiAgYWRkVG9FdmVudFF1ZXVlIDogZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gICAgdmFyIGV2ZW50UXVldWUgPSB0aGlzLmRhdGEuZXZlbnRRdWV1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50UXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudFF1ZXVlW2ldID09IGV2ZW50TmFtZSkge1xuICAgICAgICAvLyBJZiBleGlzdHMsIGRvbid0IGFkZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFkZFxuICAgIHRoaXMuZGF0YS5ldmVudFF1ZXVlLnB1c2goZXZlbnROYW1lKTtcbiAgfSxcbiAgY2hlY2tGb3JQcm9jZXNzZWRFdmVudHMgOiBmdW5jdGlvbihldmVudFF1ZXVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudFF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRRdWV1ZS5pbmRleE9mKGV2ZW50UXVldWVbaV0pID09IDApIHtcbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50UXVldWUuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZ2V0V2luZG93U2l6ZSA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3ID0gd2luZG93LFxuICAgICAgICBkID0gZG9jdW1lbnQsXG4gICAgICAgIGUgPSBkLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcbiAgICAgICAgeCA9IHcuaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGgsXG4gICAgICAgIHkgPSB3LmlubmVySGVpZ2h0fHwgZS5jbGllbnRIZWlnaHR8fCBnLmNsaWVudEhlaWdodDtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGggOiB4LFxuICAgICAgaGVpZ2h0IDogeVxuICAgIH07XG4gIH0sXG4gIHNldElmcmFtZUhlaWdodCA6IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgIGlmIChoZWlnaHQhPT10aGlzLmRhdGEuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgfVxuICB9LFxuICBnZXRJZnJhbWVQb3NpdGlvbiA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5pZnJhbWU7XG4gICAgdmFyIGJvZHlSZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgZWxlbVJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICB0b3AgPSBlbGVtUmVjdC50b3AgLSBib2R5UmVjdC50b3A7XG4gICAgICAgIC8vIGJvdHRvbSA9IGVsZW1SZWN0LnRvcCAtIGJvZHlSZWN0LnRvcCxcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9keVJlY3QsIGVsZW1SZWN0KVxuICAgIHRoaXMuZGF0YS50b3BQb3NpdGlvbiA9IHRvcDtcbiAgfSxcbiAgc2V0dXBTY3JvbGxEYXRhIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgd2hlZWwsIGZhbHNlICk7XG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIHZhciB0b3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApICAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgICAgcmV0dXJuIHRvcDtcbiAgICB9XG4gICAgdmFyIGxhc3RPZmZzZXQgPSBnZXRTY3JvbGxUb3AoKTtcbiAgICB2YXIgbGFzdERhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBmdW5jdGlvbiB3aGVlbChlKSB7XG4gICAgICBzZWxmLmRhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgfVxuICAgIHRoaXMuZGF0YS5zY3JvbGxUb3AgPSBnZXRTY3JvbGxUb3AoKTtcbiAgfVxufTsiXX0=
