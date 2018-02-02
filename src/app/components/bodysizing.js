$ryot.Component.bodySizing = function() {
  this.options = this.parent.options;
  this.elements = this.getElements();
  this.bodyOptions = this.getBodyOptions();

  // Sizing option methods
  this.bodyResize();
  this.bodyFillWidth();
};

// 
$ryot.Component.bodySizing.prototype.getElements = function() {
  var body = document.getElementsByTagName('body')[0];
  return body;
};

// 
$ryot.Component.bodySizing.prototype.getBodyOptions = function() {
  var options = {};
  var body = this.elements;
  options.resizeOption = body.getAttribute('data-ryot-resize') == "true" ? true : false;
  options.fillWidthOption = body.getAttribute('data-ryot-fillwidth') == "true" ? true : false;
  return options;
};

$ryot.Component.bodySizing.prototype.bodyResize = function() {
  var self = this;
  if (this.bodyOptions.resizeOption) {
    ADTECH.addEventListener('RYOT_RESIZE', function(e) {
      self.parent.data.docHeight = self.parent.getDocumentHeight();
      ADTECH.event("RYOT_CHILD_RESIZE", {
        docHeight : self.parent.getDocumentHeight()
      });
    });
  }
}

$ryot.Component.bodySizing.prototype.bodyFillWidth = function() {
  if (this.bodyOptions.fillWidthOption) {
    ADTECH.event("RYOT_FILLWIDTH");
  }
}