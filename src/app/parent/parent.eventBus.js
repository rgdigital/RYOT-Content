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