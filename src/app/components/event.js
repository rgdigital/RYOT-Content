$ryotContent.Component.event = function() {
  this.options = this.parent.options;
  // this.elements = this.getElements();
  // this.scrolling();
  
  this.public();
};

$ryotContent.Component.event.prototype.addEventListener = function(eventName, callback) {
  console.log('eventName', event)
};

// Add function to public interface
$ryotContent.Component.event.prototype.public = function() {
  this.parent.makePublic('addEventListener', this.addEventListener);
}