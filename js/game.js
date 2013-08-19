var tox = tox || {};

var States = {
  MENU: 0,
  PLAY: 1
}

tox.WIDTH = 800;
tox.HEIGHT = 600;

$(function() {
  tox.init();
});

tox.step = function() {
  if (tox.controller.mouse.rightPressed) {
    var target = tox.level.convertToAbsolute({
      x: tox.controller.mouse.x, 
      y: tox.controller.mouse.y
    });
    tox.player.runTo(target.x, target.y);
  }
  else {
    tox.player.stop();
  }
  tox.entityManager.update();
  tox.ctx.fillStyle = 'black';
  tox.ctx.fillRect(0, 0, tox.WIDTH, tox.HEIGHT);
  //tox.level.debugDraw(tox.ctx);
  tox.level.draw(tox.ctx);
  tox.entityManager.draw(tox.ctx);
};

tox.init = function() {
  tox.createCanvas();
  tox.state = States.PLAY;
  tox.entityManager = new tox.EntityManager();
  tox.level = new tox.Level(50, 50);
  tox.level.generate();
  tox.player = new tox.Player(100, 100, tox.level);
  tox.entityManager.add( tox.player );
  setInterval(tox.step, 30);
};

tox.createCanvas = function() {
  tox.canvas = $('#gamecanvas').get(0);
  tox.ctx = tox.canvas.getContext('2d');
  tox.canvas.width = tox.WIDTH;
  tox.canvas.height = tox.HEIGHT;
  tox.controller = new tox.Controller();
  tox.controller.init();
};

console.log(tox);
