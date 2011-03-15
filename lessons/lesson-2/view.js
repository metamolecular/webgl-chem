/**
 * @constructor
 * @param {number} width The canvas width
 * @param {number} height The canvas height
 */
var View = function(width, height) {
  this.width_ = width;
  this.height_ = height;
  this.philo_ = undefined;
  this.camera_ = undefined;
  this.gl_ = undefined;
  this.scene_ = undefined;
};

/**
 * @param {Element} parent Parent element
 */
View.prototype.render = function(parent) {
  var view = this;
  var canvas = this.createCanvas_(parent);
  
  PhiloGL(canvas, {
    events: { onMouseWheel: function(event) { view.wheelEvent_(event); } },
    onError: function() { alert("There was an error creating the app."); },
    onLoad: function(app) {
      view.philo_ = app;
      view.camera_ = app.camera;
      view.gl_ = app.gl;
      view.scene_ = app.scene;
      
      view.enterDocument();
    }
  });
};

/**
 * Called after canvas tag has been created and WebGL context has been established.
 */
View.prototype.enterDocument = function() {
  this.configureGraphics_();
  this.illuminate(0.25, 0.8);
  this.aimLight(-1, -1, -1);
  this.addObjects_();
  this.moveCamera(0, 0, -7);
  this.redraw();
};

/**
 * @param {number} ambient Ambient light intensity (0-1)
 * @param {number} directional Directional light intensity (0-1)
 */
View.prototype.illuminate = function(ambient, directional) {
  this.scene_.config.lights.enable = true;
  this.scene_.config.lights.ambient = { r: ambient, g: ambient, b: ambient };
  this.scene_.config.lights.directional.color = { r: directional, g: directional, b: directional };
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
View.prototype.aimLight = function(x, y, z) {
  this.scene_.config.lights.directional.direction = { x: x, y: y, z: z };
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
View.prototype.moveCamera = function(x, y, z) {
  this.camera_.position = { x: x, y: y, z: z };
  this.camera_.update();
};

/**
 * Must be called after any state-changing function call, such as moveCamera.
 */
View.prototype.redraw = function() {
  this.gl_.clear(this.gl_.COLOR_BUFFER_BIT | this.gl_.DEPTH_BUFFER_BIT);
  this.scene_.render();
};

/**
 * @private
 */
View.prototype.addObjects_ = function() {
  var atom = new PhiloGL.O3D.Sphere({ nlat: 20, nlong: 20, radius: 1, colors: [1, 0, 0, 1] });

  this.scene_.add(atom);
};

/**
 * @private
 */
View.prototype.configureGraphics_ = function() {
  this.philo_.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.philo_.gl.clearDepth(1.0);
  this.philo_.gl.enable(this.philo_.gl.DEPTH_TEST);
  this.philo_.gl.depthFunc(this.philo_.gl.LEQUAL);
  this.philo_.gl.viewport(0, 0, this.philo_.canvas.width, this.philo_.canvas.height);
};

/**
 * @private
 */
 View.prototype.wheelEvent_ = function(event) {
   event.stop();
   this.moveCamera(0, 0, this.camera_.position.z + event.wheel);
   this.redraw();
 };

/**
 * @private
 * @param {Element} parent
 */
View.prototype.createCanvas_ = function(parent) {
  var canvas = document.createElement('canvas');
  
  canvas.setAttribute('width', this.width_);
  canvas.setAttribute('height', this.height_);
  parent.appendChild(canvas);
  
  return canvas;
};

/**
 * @param {string} id The dom id of the element into which the view will be placed
 * @return {View}
 */
var createView = function(id) {
  var view = new View(500, 500);

  view.render(document.getElementById(id));
  
  return view;
}