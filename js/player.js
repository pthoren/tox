var tox = tox || {};

tox.PLAYER_RADIUS = 20;
tox.PLAYER_SPEED = 3;


tox.Player = function(x, y) {
  this.x = x;
  this.y = y;
};
tox.Player.prototype = new tox.Entity();
tox.Player.constructor = tox.Player;


tox.Player.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
};

tox.Player.prototype.runTo = function(x, y) {
  var delta = {
    x: x - this.x,
    y: y - this.y
  };

  var angle = Math.atan2(delta.y, delta.x);
  var vel = {
    x: Math.cos(angle) * tox.PLAYER_SPEED,
    y: Math.sin(angle) * tox.PLAYER_SPEED
  };

  this.dx = vel.x;
  this.dy = vel.y;
};
