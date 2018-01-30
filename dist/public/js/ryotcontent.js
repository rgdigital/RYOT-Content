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
$ryot.prototype.sendData = {};
$ryot.prototype.parent = window.parent;

/*
 * Constructor / Init
 */
$ryot.prototype.init = function() {
  
  var self = this;

  ADTECH.addEventListener('RYOT_META', function(e) {
    console.log(e);
  });
  console.log(ADTECH);

  this.setupSend();
  this.setupReciever();
  this.setupCore();
  this.docHeight = this.getDocumentHeight();
  this.eventBus = this.core.eventBus;
  this.addEventListeners();

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
  }, this.options.checkSpeed);
};

/*
 * Send data to parent Iframe
 */
$ryot.prototype.setupSend = function() {
  var self = this;
  setInterval(function() {
    var sendData = self.processSendData(self.sendData);
    var str = JSON.stringify(sendData);
    self.parent.postMessage(str, '*');
  }, this.options.checkSpeed);
};

/*
 * Send data to parent Iframe
 */
$ryot.prototype.processSendData = function(data) {
  var newData = {};
  
  // Send the document height, used for resizing the iframe
  newData.docHeight = this.docHeight;
  // Events sent from parent which have been processed
  newData.processedEvents = this.eventBus.processed;

  return newData;
}

/*
 * Receive data from parent iframe
 */
$ryot.prototype.setupReciever = function() {
  var self = this;
  // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listen to message from child window
  eventer(messageEvent,function(e) {
    var data = JSON.parse(e.data);
    self.data = self.processRecievedData(data);
  },false);
};

/*
 * Process data from parent
 */
$ryot.prototype.processRecievedData = function(data) {
  var newData = {};
  
  newData.eventsQueue = data.eventsQueue;
  newData.eventsProcessed = data.eventsProcessed;
  newData.topPosition = data.topPosition;
  newData.docHeight = this.docHeight;
  newData.winHeight = data.winHeight;
  newData.scrollTop = data.scrollTop;
  newData.childScrollTop = (data.scrollTop-data.topPosition<0 ? 0 : data.scrollTop-data.topPosition);
  newData.visibleBounds = this.getVisibleBounds(data.scrollTop, newData.childScrollTop, data.topPosition, newData.docHeight, data.winHeight);

  // Sync events queue
  this.eventBus.syncQueue(data.eventsQueue);
  // console.log(data.eventsQueue);

  return newData;
}

/*
 * Setup core
 */
$ryot.prototype.setupCore = function() {
  var self = this;
  var core = this.core;
  for (var key in core) {
    core[key].prototype.parent = this;
    core[key] = new core[key]();
  }
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
 * Get Doc Height for sizing
 */
$ryot.prototype.getDocumentHeight = function() {
  // var body = document.body,
  //     html = document.documentElement;
  // var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
  // console.log(height);
  // return height;
  return document.body.scrollHeight;
};

/*
 * Add event listener
 */
$ryot.prototype.addEventListener = function(eventName, callback) {
  // console.log(eventName, callback, this.eventBus)
  this.eventBus.listeners[eventName] = callback;
}

/*
 * Ready events to bus
 */
$ryot.prototype.addEventListeners = function() {
  var self = this;
  this.addEventListener('resize', function() {
    setTimeout(function() {
      self.docHeight = self.getDocumentHeight();
    }, 500);
    console.log('resize fired');
  })
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
  console.log(this.parent)
  var docHeight = this.parent.data.docHeight;
  var xPosition = (this.parent.data.childScrollTop<8 ? 0 : this.parent.data.childScrollTop-8);
  if (xPosition > (this.parent.data.docHeight-elemHeight)-10) {
    xPosition = this.parent.data.docHeight-elemHeight;
  }
  elem.style.top = xPosition + "px";
};
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
    checkSpeed : 50
  };
  var app = new $ryot(options);
})