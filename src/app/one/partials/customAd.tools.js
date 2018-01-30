/**
 * Custom Ad Tools
 */
customAd.prototype.tools = {
  events : {
    triggerEvent : function(el, eventName){
      var event;
      if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
      } else if (document.createEventObject) {// IE < 9
        event = document.createEventObject();
        event.eventType = eventName;
      }
      event.eventName = eventName;
      if (el.dispatchEvent) {
        el.dispatchEvent(event);
      } else if (el.fireEvent && htmlEvents['on'+eventName]) {// IE < 9
        el.fireEvent('on'+event.eventType,event);// can trigger only real event (e.g. 'click')
      } else if (el[eventName]){
        el[eventName]();
      } else if (el['on'+eventName]) {
        el['on'+eventName]();
      }
    },
    addEvent : function(el, type, handler){
      if (el.addEventListener) {
        el.addEventListener(type,handler,false);
      } else if (el.attachEvent && htmlEvents['on'+type]){// IE < 9
        el.attachEvent('on'+type,handler);
      } else {
        el['on'+type]=handler;
      }
    },
    removeEvent : function(el, type, handler){
      if(el.removeventListener) {
        el.removeEventListener(type,handler,false);
      } else if (el.detachEvent && htmlEvents['on'+type]){// IE < 9
        el.detachEvent('on'+type,handler);
      } else {
        el['on'+type]=null;
      }
    }
  },
  mask : function(elem, val) {
    // elem.style.clip = 'rect('+val+')';
  },
  getPercentage : function(num, percentage) {
    return (num / 100) * percentage;
  },
  /*
   * Return pixel + percent values from integer / string , eg '10%'
   */
  getSizeStyle : function(val, size) {
    // console.log(val, size)
    var tools = this.tools;
    var processed = {};
    var num = parseInt(val, 10);
    var val = val.split(num)[1];
    data = {
      num : (isNaN(parseFloat((num))) ? 0 : num),
      val : (typeof val!=='undefined' ? val : 'px')
    }
    if (data.val=='%') {
      processed['px'] = Math.round((size / 100) * data.num);
      processed['percent'] = data.num;
    } else {
      processed['px'] = data.num;
      processed['percent'] = data.num / size * 100;
    }
    return processed;
  },
  getViewportSize : function(w) {
    // Use the specified window or the current window if no argument
    w = w || window;

    // This works for all browsers except IE8 and before
    if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return { w: d.documentElement.clientWidth,
           h: d.documentElement.clientHeight };

    // For browsers in Quirks mode
    return { w: d.body.clientWidth, h: d.body.clientHeight };
  }
};