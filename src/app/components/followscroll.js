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
  var elems = this.elements;
  setInterval(function() {
    // console.log(self.parent.data)
    for (var i = 0; i < elems.length; i++) {
      self.moveElem(elems[i]);
    }
  }, 10);
};

$ryot.Component.followscroll.prototype.moveElem = function(elem) {
  var elemHeight = elem.offsetHeight;
  var docHeight = this.parent.data.docHeight;
  var xPosition = (this.parent.data.childScrollTop<8 ? 0 : this.parent.data.childScrollTop-8);
  if (xPosition > (this.parent.data.docHeight-elemHeight)-10) {
    xPosition = this.parent.data.docHeight-elemHeight;
  }
  elem.style.top = xPosition + "px";
};