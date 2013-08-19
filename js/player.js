var tox = tox || {};

tox.PLAYER_RADIUS = 20;
tox.PLAYER_SPEED = 3;


tox.Player = function(x, y, level) {
  this.x = x;
  this.y = y;
  this.level = level;
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
  var distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

  if(distance > tox.PLAYER_SPEED) {
    distance = tox.PLAYER_SPEED;
  }
  var angle = Math.atan2(delta.y, delta.x);
  var vel = {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance 
  };

  this.dx = vel.x;
  this.dy = vel.y;
};

tox.Player.prototype.stop = function() {
  this.dx = 0;
  this.dy = 0;
};

tox.Player.prototype.draw = function(context) {
  var coords = this.level.convertToIsometric({x: this.x, y: this.y});
  context.fillStyle = 'green';
  context.fillRect(coords.x-10, coords.y-10, 20, 20);
};
