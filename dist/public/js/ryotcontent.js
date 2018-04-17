(function() {(window["views"] = window["views"] || {})["index"] = function() { return "<div>  <p>Lorem ipsum dolor sit amet</p></div>";};})();
"use strict";
/*
 * RYOT Content Bootstrap
 */

/*
 * Constructor
 */
var $ryot = function(options) {
  this.options = options;
  this.init();
};

/*
 * DOM is ready
 */
$ryot.ready = function(callback) {
  var self = this;
  var baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;
  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        // var preload = new self.preload(readyList[i].fn.call(window, readyList[i].ctx));
        var preload = new self.preload(readyList[i].fn);
      }
      readyList = [];
    }
  }
  function readyStateChange() {
    if ( document.readyState === "complete" ) {
      ready();
    }
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback for docReady(fn) must be a function");
  }
  if (readyFired) {
    setTimeout(function() {
      callback();
    }, 1);
    return;
  } else {
    readyList.push({fn: callback});
  }
  if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
    setTimeout(ready, 1);
  } else if (!readyEventHandlersInstalled) {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", ready, false);
      window.addEventListener("load", ready, false);
    } else {
      document.attachEvent("onreadystatechange", readyStateChange);
      window.attachEvent("onload", ready);
    }
    readyEventHandlersInstalled = true;
  }
};

/*
 * Preload assets
 */
$ryot.preload = function(callback) {

  var spinner;
  var imageAssets = document.getElementsByTagName('img');
  var assetsStr = '';
  var assetCount = imageAssets.length;
  // Build cache
  var imageCache = document.createElement('div');
  document.body.appendChild(imageCache);
  imageCache.style.display = 'none';
  // Loop through and load
  for (var i = 0; i < assetCount; i++) {
    preloadImage(imageAssets[i].src, i, assetCount);
    assetsStr += '<img src="'+imageAssets[i].src+'"/>';
  }
  imageCache.innerHTML += assetsStr;
  addPreloaderSpinner();

  function addPreloaderSpinner() {
    spinner = document.createElement('div');
    spinner.id = "spinner";
    spinnerText = document.createElement('p');
    spinnerText.innerHTML = "Loading";
    // var iframe = window.parent.document.getElementById('ryotiframe');
    // console.log(iframe);
    spinner.appendChild(spinnerText);
    document.body.appendChild(spinner);
  };
  // Fire preloader
  function preloadImage(src, i, assetCount) {
    var image = new Image();
    image.onload = loading.bind(null, src, i, assetCount);
    image.src = src;
  };
  // DOM interactions
  function loading(src, i, assetCount, event) {
    var amount = (assetCount/100) * i * 100;
    if (i==assetCount-1) loadingComplete();
  };
  // Complete
  function loadingComplete() {
    spinner.style.display = "none";
    callback();
  };

}

/*
 * Core classes shorthand
 */
$ryot.prototype.core = {};
$ryot.Core = $ryot.prototype.core;

/*
 * HTML Components shorthand
 */
$ryot.prototype.components = {};
$ryot.Component = $ryot.prototype.components;

/*
 * Props
 */
$ryot.prototype.data = {};
$ryot.prototype.parent = window.parent;

/*
 * Constructor / Init
 */
$ryot.prototype.init = function() {
  
  var self = this;

  this.data = {};
  this.data.docHeight = this.getDocumentHeight();

  this.addEventListeners();
  this.addEventDispatchers();

  // Delay this many times
  var delay = 5,
      i = 0;
  // Loop
  var delayedInit = setInterval(function() {
    if (i > delay) {
      self.setupComponents();
      clearInterval(delayedInit);
    }
    ++i;
  }, 50);
  // }, this.options.checkSpeed);
};

/*
 * 
 */
$ryot.prototype.addEventListeners = function() {
  var self = this;
  ADTECH.addEventListener('RYOT_PARENT_META', function(e) {
    var data = e.meta;
    var newData = {};
    // newData.eventsQueue = data.eventsQueue;
    // newData.eventsProcessed = data.eventsProcessed;
    newData.topPosition = data.topPosition;
    newData.docHeight = self.data.docHeight;
    newData.winHeight = data.winHeight;
    newData.scrollTop = data.scrollTop;
    newData.childScrollTop = (data.scrollTop-data.topPosition<0 ? 0 : data.scrollTop-data.topPosition);
    newData.visibleBounds = self.getVisibleBounds(data.scrollTop, newData.childScrollTop, data.topPosition, newData.docHeight, data.winHeight);
    // Set data
    self.data = newData;
  });
};

/*
 * 
 */
$ryot.prototype.addEventDispatchers = function() {
  ADTECH.event('RYOT_CHILD_META', this.data);
};

/*
 * Get Doc Height for sizing
 */
$ryot.prototype.getDocumentHeight = function() {
  return document.body.scrollHeight;
};

/*
 * Setup components
 */
$ryot.prototype.setupComponents = function() {
  var self = this;
  var components = this.components;
  for (var key in components) {
    components[key].prototype.parent = this;
    components[key].prototype.tools = new this.tools();
    components[key] = new components[key]();
  }
};

/*
 * Get visible bounds
 */
$ryot.prototype.getVisibleBounds = function(scrollTop, childScrollTop, topPos, docHeight, winHeight) {
  // Set vars
  var visibleTop = (childScrollTop - topPos < 0 ? 0 : childScrollTop - topPos);
  var visibleBottom = scrollTop + winHeight;
  // Limit
  if (visibleBottom > docHeight) {
    visibleBottom = docHeight;
  }
  return {
    visibleTop : visibleTop,
    visibleBottom : visibleBottom
  }
};
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
/*
 * Core Tools class
 */
$ryot.prototype.tools = function() {
  return this;
};

$ryot.prototype.tools.prototype = {
  addClass : function(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },
  removeClass : function(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },
  toggleClass : function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  },
  hasClass : function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },
  getElemPosition : function(elem) {
    var elemRect = elem.getBoundingClientRect()
    return elemRect;
  },
  getFunctionName : function(fn) {
    var f = typeof fn == 'function';
    var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
    return (!f && 'not a function') || (s && s[1] || 'anonymous');
  },
  loadScripts : function(urls, callback) {
    var results = [];
    var parent = document.getElementsByTagName('head')[0] || document.body;
    var urlsLeft = urls.length;
    function loadNext(len, script, url, eventName) {
      if (urlsLeft == len) {
        if (eventName) {
          results.push({
            script: script,
            url: url,
            event: eventName
          });
        }
        if (urlsLeft) {
          var url = urls.shift();
          len = --urlsLeft;
          var script = document.createElement('script');
          script.src = url;
          script.onload = function() {
            loadNext(len, script, url, 'load');
          };
          script.onerror = function() {
            loadNext(len, script, url, 'error');
          };
          parent.appendChild(script);
        }
        else if (callback) {
          callback(results);
        }
      }
    }
    loadNext(urlsLeft);
  }
}
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
    for (var i = 0; i < elems.length; i++) {
      self.moveElem(elems[i]);
    }
  }, this.options.checkSpeed);
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
$ryot.Component.snowBackground = function() {
  this.elements = this.getElements();
  if (this.elements.length > 0) {
    this.loadScripts();
  }
};

$ryot.Component.snowBackground.prototype = {
  getElements : function() {
    var elements = document.getElementsByClassName('ryot-snowbackground');
    return elements;
  },
  loadScripts : function() {
    var self = this;
    this.tools.loadScripts([
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/87/three.min.js",
      "public/js/libs/OBJLoader.js"
    ], function(results) {
      // Ready
      self.init();
    })
  },
  /*
   * Scene objects
   */
  objects : {},
  /*
   * Run
   */
  init: function() {
    this.createRenderer();
    this.addCamera();
    this.addLights();
    this.addObjects();
    this.render();
    this.animate();

    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  },
  /*
   * Create canvas element for rendering
   */
  createRenderer : function() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = "background";
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = 0;
    this.renderer.domElement.style.left = 0;
    this.renderer.domElement.style.zIndex = -1;
    document.body.insertBefore(this.renderer.domElement, document.body.firstChild);
    // document.body.appendChild(this.renderer.domElement);
  },
  /*
   * Resize handler
   */
  onWindowResize : function() {
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  },
  /*
   * Add camera to scene
   */
  addCamera :function() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.focus = 2;
    // this.camera.position.z = 200;
    // this.camera.rotation.x = 8;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt( this.scene.position );
  },
  /*
   * Add lights to scene
   */
  addLights :function() {
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.3 );
    this.scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 0.9 );
    pointLight.position.set(2, 2, 5);
    this.camera.add(pointLight);
    this.scene.add(this.camera);
  },
  /*
   * Add objects to scene
   */
  addObjects : function() {
    var self = this;
    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);
    this.birds = [];
    loader.load( 'public/js/models/triangle.obj', function(object) {
      var offeset = 8;
      var particleCount = 4000;
      var startPoint = 2000;
      for (var i = 0; i < particleCount; i++) {
        var radius = startPoint;
        var angle = Math.PI * 2 / startPoint * i; 
        var bird = addObject(object, Math.cos(angle) * radius, Math.sin(angle) * radius);
        self.birds.push(bird);
      }
      startPoint -= offeset;
    });
    function addObject(srcGroup, posX, posY){
      var speedX = 0;
      var speedY = 0;
      var rotateX = 0.05 * Math.random() + 0.01;
      var rotateY = 0.05 * Math.random() + 0.01;
      var mesh = THREE.Group;
      this.mesh = srcGroup.clone();
      this.mesh.rotateX(Math.PI * 2 * Math.random());
      this.mesh.rotateY(Math.PI * 2 * Math.random());
      this.mesh.scale.multiplyScalar(1 + Math.random());
      this.mesh.position.x = setParticleX();
      this.mesh.position.y = setParticleY();
      // this.mesh.position.z = (Math.random() - 0.5) * window.innerHeight;
      this.mesh.position.z = setParticleDistance();
      self.scene.add(this.mesh);
      return this.mesh;
    }
    function setParticleX() {
      var min = -1500;
      var max = 1500;
      return Math.floor(Math.random()*(max-min+1)+min);
      // return (Math.random() - 0.5) * window.innerWidth;
    }
    function setParticleY() {
      var min = -1500;
      var max = 600;
      return Math.floor(Math.random()*(max-min+1)+min);
      // return (Math.random() - 0.5) * window.innerHeight;
    }
    function setParticleDistance() {
      // return -500;
      var min = -500;
      var max = 10;
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  },
  /*
   * Animate objects
   */
  animate : function() {
    var objects = this.birds;
    for (var key in objects) {
      if (typeof objects[key]=='undefined') return;
      var particle = objects[key];
      particle.rotation.x += 0.01;
      // particle.position.x += 0.1;
      particle.position.y -= 0.3;
      if (particle.position.y < -1500) {
        // Reset position and start again
        particle.position.y = 600;
      }
    }
    // this.camera.rotation.z += 6;
  },
  /*
   * Render frame to canvas (loops)
   */
  render : function() {
    var self = this;
    var clockwise = true;
    function render() {
      self.animate();
      requestAnimationFrame(render);
      var rotation = self.camera.rotation.y;
      var limit = 0.6;
      if (rotation > limit) {
        clockwise = false;
      } else if (rotation < -limit) {
        clockwise = true;
      }
      self.camera.rotation.y += (clockwise ? 0.0004 : -0.0004);
      self.renderer.render( self.scene, self.camera );
    }
    render();
  }
}
$ryot.ready(function() {
  var options = {
    // Speed in ticks between data checks
    checkSpeed : 5
  };
  $app = new $ryot(options);
})