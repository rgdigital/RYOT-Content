/*
 * Core eventBus class
 */
$ryot.Core.eventBus = function() {
  this.monitor = this.startEventsQueueMonitor();
  return this;
};

$ryot.Core.eventBus.prototype = {
  listeners : {},
  queue : {},
  processed : {},
  syncQueue : function(data) {
    this.queue = data;
  },
  startEventsQueueMonitor : function() {
    var self = this;
    return setInterval(function() {
      var queue = self.queue;
      for (var key in queue) {
        var listener = self.findEventListener(queue[key]);
        listener && listener();
        self.removeFromQueue(queue[key]);
      }
    }, 50);
  },
  addToQueue : function(eventName, data) {
    
  },
  removeFromQueue : function(eventName) {
    var queue = this.queue;
    for (var key in queue) {
      if (queue[key] == eventName) {
        // mark as processed
        this.processed[key] = queue[key];
        // remove from queue
        delete queue[key];
        // delete this.processed[key];
      }
    }
  },
  findEventListener : function(eventName) {
    var listeners = this.listeners;
    for (var key in listeners) {
      if (eventName==key) {
        return listeners[key];
      }
    }
    return false;
  },
}