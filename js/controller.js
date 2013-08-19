tox.Controller = function() {
  this.mouse = {
    x: 0,
    y: 0,
    leftPressed: false,
    rightPressed: false
  };

  this.bindings = {
    spell0: 65, //a
    spell1: 83, //s
    spell2: 68, //d
    spell3: 70, //f
    jump: 32 //space
  };
};

tox.Controller.prototype.init = function() {
  tox.keysPressed = {};

  var _this = this;

  tox.canvas.onmousemove = function(e) {
    _this.mouse.x = e.x;
    _this.mouse.y = e.y;
    //console.log(_this.mouse.leftPressed, _this.mouse.rightPressed);
  };

  tox.canvas.onmousedown = function(e) {
    if (e.button === 0) {
      _this.mouse.leftPressed = true;
    } else if (e.button === 2) {
      _this.mouse.rightPressed = true;
    }
  };

  tox.canvas.onmouseup = function(e) {
    if (e.button === 0) {
      _this.mouse.leftPressed = false;
    } else if (e.button === 2) {
      _this.mouse.rightPressed = false;
    }
  };

  tox.canvas.oncontextmenu = function() {
    return false;
  };

  window.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    tox.keysPressed[e.keyCode] = true;
  }, true);

  window.addEventListener("keyup", function(e) {
    tox.keysPressed[e.keyCode] = false;
  }, true);
};

tox.Controller.prototype.isPressed = function(keyName) {
  return tox.keysPressed[this.bindings[keyName]]; 
};


