/*
 * Core eventBus class
 */
$ryot.Core.eventBus = function() {
  this.monitorEventsQueue();
  return this;
};

$ryot.Core.eventBus.prototype = {
  listeners : {},
  queue : {},
  processed : {},
  getQueue : function(data) {
    this.queue = data;
  },
  addToQueue : function(eventName, data) {
    this.key = key;
    this.eventName = eventName;
    // this.data = data;
    return {
      key : key,
      eventName : eventName,
      // data : data,
    }
  },
  monitorEventsQueue : function() {
    var self = this;
    setInterval(function() {
      var queue = self.queue;
      for (var key in queue) {
        var listener = self.findEventListener(queue[key]);
        console.log(listener);
        listener && listener();
      }
    }, 50);
  },
  findEventListener : function(eventName) {
    var listeners = this.listeners;
    for (var key in listeners) {
      if (eventName==listeners[key]) {
        return listener[key];
      }
    } 
    return false;
  },
  removeFromQueue : function() {},
  checkForProcessed : function() {},
  processEvents : function() {
    var queue = this.queue;
    console.log(queue)
    return;
    var queue = this.data.eventQueue;
    for (var i = 0; i < queue.length; i++) {
      switch (queue[i]) {
        case 'resize':
          if (this.processedEvents.indexOf(queue[i]) == -1) {
            this.processedEvents.push(queue[i]);
            console.log("add", this.processedEvents[i]);
          }
          break;
        default:
          // default
          break;
      }
    }
    // console.log("child processed", this.processedEvents)
  }
}