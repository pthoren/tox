var tox = tox || {};

tox.ENTITY_DEFAULT_RADIUS = 10;

tox.Entity = function() {
  this.dx = 0;
  this.dy = 0;

  this.radius = tox.ENTITY_DEFAULT_RADIUS;
  this.die = false
};

tox.Entity.prototype.collideWithEntity = function(other) {

};

tox.Entity.prototype.update = function() {
  // Override this
};

tox.Entity.prototype.draw = function(context) {
  // Override this
};

tox.Entity.prototype.drawDebug = function(context) {
  context.strokeStyle = 'white';
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  context.stroke();
};
