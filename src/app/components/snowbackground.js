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