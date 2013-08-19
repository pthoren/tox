var tox = tox || {};

tox.PLAYER_RADIUS = 20;
tox.PLAYER_SPEED = 3;

tox.Player = function(x, y, level) {
  this.x = x;
  this.y = y;
  this.drawPos = {
    x: 0,
    y: 0
  };
  this.level = level;
  this.hp = 100;
};

tox.Player.prototype = new tox.Entity();
tox.Player.constructor = tox.Player;

tox.Player.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.collideLevel();
};

//This collision function depends on an assumption:
// the player's diameter is smaller than a tile size.
tox.Player.prototype.collideLevel = function() {
  var i = Math.floor(this.x / tox.TILE_SIZE);
  var j = Math.floor(this.y / tox.TILE_SIZE);

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
  this.drawPos = this.level.convertToIsometric({x: this.x, y: this.y});
  context.fillStyle = 'green';
  context.fillRect(this.drawPos.x-10, this.drawPos.y-60, 20, 70);
};
