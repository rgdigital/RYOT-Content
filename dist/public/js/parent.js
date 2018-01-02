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
  data : {},
  init : function() {
    this.setupScrollData();
    this.setupSend();
    this.setupReciever();
  },
  setupSend : function() {
    var self = this;
    // var data = this.data;
    setInterval(function() {
      var str = JSON.stringify(self.data);
      self.iframe.contentWindow.postMessage(str.toString(), '*');
    }, 250);
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
  setIframeHeight : function(height) {
    if (height!==this.data.height) {
      this.data.height = height;
      this.iframe.style.height = height + "px";
    }
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
  }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhcmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIFBvbHlmaWxsXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbiAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICAgIGZ1bmN0aW9uKCBjYWxsYmFjayApe1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgICAgfTtcbn0pKCk7XG5cbi8qXG4gKiBSWU9UIENvbnRlbnQgQm9vdHN0cmFwIFBBUkVOVFxuICovXG5cbi8qXG4gKiBDb25zdHJ1Y3RvclxuICovXG52YXIgJHJ5b3RQYXJlbnQgPSBmdW5jdGlvbihpZnJhbWUpIHtcbiAgdGhpcy5pZnJhbWUgPSBpZnJhbWU7XG4gIHRoaXMuaW5pdCgpO1xufTtcblxuJHJ5b3RQYXJlbnQucHJvdG90eXBlID0ge1xuICBkYXRhIDoge30sXG4gIGluaXQgOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldHVwU2Nyb2xsRGF0YSgpO1xuICAgIHRoaXMuc2V0dXBTZW5kKCk7XG4gICAgdGhpcy5zZXR1cFJlY2lldmVyKCk7XG4gIH0sXG4gIHNldHVwU2VuZCA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShzZWxmLmRhdGEpO1xuICAgICAgc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShzdHIudG9TdHJpbmcoKSwgJyonKTtcbiAgICB9LCAyNTApO1xuICB9LFxuICBzZXR1cFJlY2lldmVyIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIENyZWF0ZSBJRSArIG90aGVycyBjb21wYXRpYmxlIGV2ZW50IGhhbmRsZXJcbiAgICB2YXIgZXZlbnRNZXRob2QgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/IFwiYWRkRXZlbnRMaXN0ZW5lclwiIDogXCJhdHRhY2hFdmVudFwiO1xuICAgIHZhciBldmVudGVyID0gd2luZG93W2V2ZW50TWV0aG9kXTtcbiAgICB2YXIgbWVzc2FnZUV2ZW50ID0gZXZlbnRNZXRob2QgPT0gXCJhdHRhY2hFdmVudFwiID8gXCJvbm1lc3NhZ2VcIiA6IFwibWVzc2FnZVwiO1xuICAgIC8vIExpc3RlbiB0byBtZXNzYWdlIGZyb20gY2hpbGQgd2luZG93XG4gICAgZXZlbnRlcihtZXNzYWdlRXZlbnQsZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICBzZWxmLnNldElmcmFtZUhlaWdodChkYXRhLmRvY0hlaWdodCk7XG4gICAgfSxmYWxzZSk7XG4gIH0sXG4gIHNldElmcmFtZUhlaWdodCA6IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgIGlmIChoZWlnaHQhPT10aGlzLmRhdGEuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgfSxcbiAgc2V0dXBTY3JvbGxEYXRhIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgd2hlZWwsIGZhbHNlICk7XG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIHZhciB0b3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApICAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgICAgcmV0dXJuIHRvcDtcbiAgICB9XG4gICAgdmFyIGxhc3RPZmZzZXQgPSBnZXRTY3JvbGxUb3AoKTtcbiAgICB2YXIgbGFzdERhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBmdW5jdGlvbiB3aGVlbChlKSB7XG4gICAgICBzZWxmLmRhdGEuc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgfVxuICB9XG59OyJdfQ==
