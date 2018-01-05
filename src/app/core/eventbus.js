/*
 * Core eventBus class
 */
$ryot.Core.eventBus = function() {
  
  return this;
};

$ryot.Core.eventBus.prototype = {
  queue : {},
  processed : {},
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
  removeFromQueue : function() {},
  checkForProcessed : function() {},
  processEvents : function() {
    console.log(this)
    var queue = this.data.eventQueue;
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