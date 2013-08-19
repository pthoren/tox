var tox = tox || {};

tox.TileType = {
  FLOOR: 0,
  WALL: 1
};

tox.TILE_SIZE = 30;
tox.ISO_TILE_HEIGHT = 50;

tox.Level = function(width, height) {
  this.width = width;
  this.height = height;

  this.tiles = new Array();

  for(var i = 0; i < width; i++) {
    this.tiles[i] = new Array();
    for(var j = 0; j < height; j++) {
      this.tiles[i][j] = {
        type: tox.TileType.FLOOR
      };
    }
  }
};

tox.Level.prototype.generate = function() {
  //Simple generate function encloses the level with walls.
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      if(i === 0 || j === 0 || i === this.width-1 || j === this.height-1) {
        this.tiles[i][j].type = tox.TileType.WALL;
      }
    }
  }
};

tox.ISO_X_OFFSET = tox.ISO_TILE_HEIGHT;
tox.ISO_Y_OFFSET = tox.ISO_TILE_HEIGHT / 2;
tox.Level.prototype.draw = function(context) {
  context.strokeStyle = 'red';
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      context.save();
      context.translate( (i - j) * tox.ISO_X_OFFSET,
                         (i + j) * tox.ISO_Y_OFFSET );
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(tox.ISO_X_OFFSET, tox.ISO_Y_OFFSET);
      context.lineTo(0, 2 * tox.ISO_Y_OFFSET);
      context.lineTo(-tox.ISO_X_OFFSET, tox.ISO_Y_OFFSET);
      context.closePath();
      context.stroke();
      context.restore();
    }
  }
};

tox.Level.prototype.debugDraw = function(context) {
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      if(this.tiles[i][j].type === tox.TileType.FLOOR) {
        context.fillStyle = 'white';
      }
      else {
        context.fillStyle = 'black';
      }
      context.fillRect(i * tox.TILE_SIZE, j * tox.TILE_SIZE, tox.TILE_SIZE, tox.TILE_SIZE);
    }
  }
};

/*
 *  Convert from absolute coordinates to isometric screen coordinates
 */
tox.ISO_X_REL = tox.ISO_X_OFFSET / tox.TILE_SIZE;
tox.ISO_Y_REL = tox.ISO_Y_OFFSET / tox.TILE_SIZE;
tox.Level.prototype.convertToIsometric = function(coords) {
  return {
    x: (coords.x - coords.y) * tox.ISO_X_REL,
    y: (coords.x + coords.y) * tox.ISO_Y_REL
  };
};

/*
 *  The opposite of the function above.
 */
tox.Level.prototype.convertToAbsolute = function(coords) {
  return {
    x: ((coords.x / tox.ISO_X_REL) + (coords.y / tox.ISO_Y_REL)) / 2,
    y: ((coords.y / tox.ISO_Y_REL) - (coords.x / tox.ISO_X_REL)) / 2
  };
};
