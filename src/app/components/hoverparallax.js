$ryot.Component.hoverParallax = function() {
  
  // this.options = this.parent.options;
  this.elements = this.getElements();

  if (this.elements.wrapper !== undefined) {
    this.options = this.getOptions();
    // Set hover parallax
    this.setParallax();
  }
};

// Elements
$ryot.Component.hoverParallax.prototype.getElements = function() {
  var elements = {};
  elements.body = document.getElementsByTagName('body')[0];
  elements.wrapper = document.getElementsByClassName('ryot-hover-parallax')[0];
  if (elements.wrapper !== undefined) {
    elements.layers = elements.wrapper.getElementsByClassName('ryot-layer');  
  }
  return elements;
};

// Body options
$ryot.Component.hoverParallax.prototype.getOptions = function() {
  var options = {};
  var body = this.elements;
  var wrapper = this.elements.wrapper;

  options.scale = wrapper.getAttribute('data-ryot-scale')==null ? false : wrapper.getAttribute('data-ryot-scale');
  options.snapSpeed = wrapper.getAttribute('data-ryot-snapspeed')==null ? false : wrapper.getAttribute('data-ryot-snapspeed');
  
  return options;
};

// Set parallax on layers
$ryot.Component.hoverParallax.prototype.setParallax = function() {
  var self = this;

  var parent = this.elements.wrapper;
  var children = this.elements.layers;
  var o = this.options;

  var scale = o.scale || 1;
  var snapSpeed = o.snapSpeed || 0.4;

  function mouseOver() {
    TweenMax.to(photoWrapper, 1.5, {scale:1.2, ease:Power4.easeOut});
  }
  function mouseOut() {
    TweenMax.to(photoWrapper, 1.5, {scale:1, x:0, y:0, ease:Power4.easeOut});
  }

  parent.addEventListener('mousemove', function(e) {
    e.stopPropagation();
    var pos = self.getXY(e, this);
    self.moveLayers(parent, children, pos)
  });

  parent.addEventListener('mouseover', function(e) {
    e.stopPropagation();
    TweenMax.to(children, (!snapSpeed ? 0.4 : snapSpeed), {scale:(scale=='true' ? 1.1 : scale), x:0, y:0});
  });

  parent.addEventListener('mouseout', function(e) {
    e.stopPropagation();
    TweenMax.to(children, (!snapSpeed ? 0.4 : snapSpeed), {scale:1, x:0, y:0});
  });

};

// Get XY position of mouse in parent
$ryot.Component.hoverParallax.prototype.getXY = function(evt, element) {
    var rect = element.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop?
    document.documentElement.scrollTop:document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft?                   
    document.documentElement.scrollLeft:document.body.scrollLeft;
    var elementLeft = rect.left+scrollLeft;  
    var elementTop = rect.top+scrollTop;
    if (document.all){ //detects using IE   
      x = event.clientX+scrollLeft-elementLeft; //event not evt because of IE
      y = event.clientY+scrollTop-elementTop;
    } else {
      x = evt.pageX-elementLeft;
      y = evt.pageY-elementTop;
    }
    return {x:x, y:y};
};

// Move children elements
$ryot.Component.hoverParallax.prototype.moveLayers = function(parent, children, pos) {
  var children = this.elements.layers;
  var friction = 1/1;
  for (var i = children.length - 1; i >= 0; i--) {
    this.moveLayer(parent, children[i], pos, friction+=0.9);
  }
};

$ryot.Component.hoverParallax.prototype.moveLayer = function(parent, child, pos, friction) {
  var lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = friction || 1 / 1,
      mouseMod = 100;
  var lMouseX = Math.max(-(mouseMod), Math.min((mouseMod), parent.offsetWidth / 2 - pos.x));
  var lMouseY = Math.max(-(mouseMod), Math.min((mouseMod), parent.offsetHeight / 2 - pos.y));
  lFollowX = (20 * lMouseX) / (mouseMod);
  lFollowY = (10 * lMouseY) / (mouseMod);
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;
  TweenMax.to(child, 0.6, {x:x, y:y});
}