$ryot.Component.followscroll = function() {
  this.options = this.parent.options;
  this.elements = this.getElements();
  this.scrolling();
}

$ryot.Component.followscroll.prototype.getElements = function() {
  var elements = document.getElementsByClassName('ryot-followscroll');
  return elements;
};

$ryot.Component.followscroll.prototype.scrolling = function() {
  var self = this;
  setInterval(function() {
    var xPosition = (self.parent.data.childScrollTop<8 ? 0 : self.parent.data.childScrollTop-8)
    self.elements[0].style.top = xPosition + "px";
  }, this.options.checkSpeed);
};