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
    topPosition : 0,
    scrollTop : 0,
    winWidth : 0,
    winHeight : 0,
  },
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
  setupResize : function() {
    var self = this;
    var winSize = self.getWindowSize();
    self.data.winWidth = winSize.width;
    self.data.winHeight = winSize.height;
    window.addEventListener('resize', function(){
      var winSize = self.getWindowSize();
      self.data.winWidth = winSize.x;
      self.data.winHeight = winSize.y;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwYXJlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBQb2x5ZmlsbFxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICBmdW5jdGlvbiggY2FsbGJhY2sgKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgIH07XG59KSgpO1xuXG4vKlxuICogUllPVCBDb250ZW50IEJvb3RzdHJhcCBQQVJFTlRcbiAqL1xuXG4vKlxuICogQ29uc3RydWN0b3JcbiAqL1xudmFyICRyeW90UGFyZW50ID0gZnVuY3Rpb24oaWZyYW1lKSB7XG4gIHRoaXMuaWZyYW1lID0gaWZyYW1lO1xuICB0aGlzLmluaXQoKTtcbn07XG5cbiRyeW90UGFyZW50LnByb3RvdHlwZSA9IHtcbiAgZGF0YSA6IHtcbiAgICB0b3BQb3NpdGlvbiA6IDAsXG4gICAgc2Nyb2xsVG9wIDogMCxcbiAgICB3aW5XaWR0aCA6IDAsXG4gICAgd2luSGVpZ2h0IDogMCxcbiAgfSxcbiAgaW5pdCA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIEdldCBkYXRhXG4gICAgdGhpcy5zZXR1cFNjcm9sbERhdGEoKTtcbiAgICB0aGlzLmdldElmcmFtZVBvc2l0aW9uKCk7XG4gICAgLy8gQXR0YWNoIHJlc2l6ZSBsaXN0ZW5lclxuICAgIHRoaXMuc2V0dXBSZXNpemUoKTtcbiAgICAvLyBBdHRhY2ggZGF0YSBzZW5kIC8gcmVjaWV2ZVxuICAgIHRoaXMuc2V0dXBTZW5kKCk7XG4gICAgdGhpcy5zZXR1cFJlY2lldmVyKCk7XG4gIH0sXG4gIHNldHVwU2VuZCA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShzZWxmLmRhdGEpO1xuICAgICAgc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShzdHIudG9TdHJpbmcoKSwgJyonKTtcbiAgICB9LCA1MCk7XG4gIH0sXG4gIHNldHVwUmVjaWV2ZXIgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gQ3JlYXRlIElFICsgb3RoZXJzIGNvbXBhdGlibGUgZXZlbnQgaGFuZGxlclxuICAgIHZhciBldmVudE1ldGhvZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gXCJhZGRFdmVudExpc3RlbmVyXCIgOiBcImF0dGFjaEV2ZW50XCI7XG4gICAgdmFyIGV2ZW50ZXIgPSB3aW5kb3dbZXZlbnRNZXRob2RdO1xuICAgIHZhciBtZXNzYWdlRXZlbnQgPSBldmVudE1ldGhvZCA9PSBcImF0dGFjaEV2ZW50XCIgPyBcIm9ubWVzc2FnZVwiIDogXCJtZXNzYWdlXCI7XG4gICAgLy8gTGlzdGVuIHRvIG1lc3NhZ2UgZnJvbSBjaGlsZCB3aW5kb3dcbiAgICBldmVudGVyKG1lc3NhZ2VFdmVudCxmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgIHNlbGYuc2V0SWZyYW1lSGVpZ2h0KGRhdGEuZG9jSGVpZ2h0KTtcbiAgICB9LGZhbHNlKTtcbiAgfSxcbiAgc2V0dXBSZXNpemUgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHdpblNpemUgPSBzZWxmLmdldFdpbmRvd1NpemUoKTtcbiAgICBzZWxmLmRhdGEud2luV2lkdGggPSB3aW5TaXplLndpZHRoO1xuICAgIHNlbGYuZGF0YS53aW5IZWlnaHQgPSB3aW5TaXplLmhlaWdodDtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB3aW5TaXplID0gc2VsZi5nZXRXaW5kb3dTaXplKCk7XG4gICAgICBzZWxmLmRhdGEud2luV2lkdGggPSB3aW5TaXplLng7XG4gICAgICBzZWxmLmRhdGEud2luSGVpZ2h0ID0gd2luU2l6ZS55O1xuICAgIH0sIHRydWUpO1xuICB9LFxuICBnZXRXaW5kb3dTaXplIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHcgPSB3aW5kb3csXG4gICAgICAgIGQgPSBkb2N1bWVudCxcbiAgICAgICAgZSA9IGQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBnID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLFxuICAgICAgICB4ID0gdy5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aCxcbiAgICAgICAgeSA9IHcuaW5uZXJIZWlnaHR8fCBlLmNsaWVudEhlaWdodHx8IGcuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCA6IHgsXG4gICAgICBoZWlnaHQgOiB5XG4gICAgfTtcbiAgfSxcbiAgc2V0SWZyYW1lSGVpZ2h0IDogZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgaWYgKGhlaWdodCE9PXRoaXMuZGF0YS5oZWlnaHQpIHtcbiAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgICB9XG4gIH0sXG4gIGdldElmcmFtZVBvc2l0aW9uIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmlmcmFtZTtcbiAgICB2YXIgYm9keVJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBlbGVtUmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHRvcCA9IGVsZW1SZWN0LnRvcCAtIGJvZHlSZWN0LnRvcDtcbiAgICAgICAgLy8gYm90dG9tID0gZWxlbVJlY3QudG9wIC0gYm9keVJlY3QudG9wLFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5UmVjdCwgZWxlbVJlY3QpXG4gICAgdGhpcy5kYXRhLnRvcFBvc2l0aW9uID0gdG9wO1xuICB9LFxuICBzZXR1cFNjcm9sbERhdGEgOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB3aGVlbCwgZmFsc2UgKTtcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgdmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICByZXR1cm4gdG9wO1xuICAgIH1cbiAgICB2YXIgbGFzdE9mZnNldCA9IGdldFNjcm9sbFRvcCgpO1xuICAgIHZhciBsYXN0RGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGZ1bmN0aW9uIHdoZWVsKGUpIHtcbiAgICAgIHNlbGYuZGF0YS5zY3JvbGxUb3AgPSBnZXRTY3JvbGxUb3AoKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhLnNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcCgpO1xuICB9XG59OyJdfQ==
