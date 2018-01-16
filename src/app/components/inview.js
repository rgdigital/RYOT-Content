$ryot.Component.inview = function() {
  this.options = this.parent.options;
  this.elements = this.getElements();
  // this.tools = this.parent.core.tools;

  this.threshold = 15;

  this.scrolling();
}

$ryot.Component.inview.prototype.getElements = function() {
  var elements = document.getElementsByClassName('ryot-inview');
  return elements;
};

$ryot.Component.inview.prototype.scrolling = function() {
  var self = this;
  // Delay this many times
  var delay = 5,
      i = 0;
  // Loop
  setInterval(function() {
    if (i > delay)
      self.areElemsInView();
    ++i;
  }, this.options.checkSpeed);
};

$ryot.Component.inview.prototype.areElemsInView = function() {
  
  var elems = this.elements;
  var data = this.parent.data;
  var bounds = data.visibleBounds;
  var scrollTop = data.scrollTop;
  var topMargin = data.topPosition;
  var winHeight = data.winHeight;
  var docHeight = data.docHeight;

  var visibleTop = (scrollTop - topMargin < 0 ? 0 : scrollTop - topMargin);
  var visibleBottom = scrollTop - topMargin + winHeight;

  for (var i = elems.length - 1; i >= 0; i--) {
    var pos = this.tools.getElemPosition(elems[i]);
    var elemPos = pos.top + data.topPosition;
    var elem = elems[i];
    if (pos.top >= (visibleTop-this.threshold) && pos.bottom <= (visibleBottom+this.threshold)) {
      if (!this.tools.hasClass(elem, "ryot-shown")) {
        this.tools.addClass(elem, "ryot-shown");
      }
      if (!this.tools.hasClass(elem, "ryot-visible")) {
        this.tools.addClass(elem, "ryot-visible");
      }
    } else {
      if (this.tools.hasClass(elem, "ryot-visible")) {
        this.tools.removeClass(elem, "ryot-visible");
      }
    }
  }
};

$ryot.Component.inview.prototype.getElemPosition = function(elem) {
  var pos = this.tools.getElemPosition(elem);
  return {
    top : pos.top,
    bottom : pos.bottom
  };
};