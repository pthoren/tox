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
    tox.player.runTo(tox.controller.mouse.x, tox.controller.mouse.y);
    console.log("run");
  }
  tox.entityManager.update();
  tox.entityManager.draw(tox.ctx);
};

tox.init = function() {
  tox.createCanvas();
  tox.state = States.PLAY;
  tox.entityManager = new tox.EntityManager();
  tox.player = new tox.Player(100, 100);
  tox.entityManager.add( tox.player );
  setInterval(tox.step, 30);
};

tox.createCanvas = function() {
  tox.canvas = $('#gamecanvas').get(0);
  tox.ctx = tox.canvas.getContext('2d');
  tox.canvas.width = tox.WIDTH;
  tox.canvas.height = tox.HEIGHT;
  tox.ctx.fillStyle = '#000000';
  tox.ctx.fillRect(0, 0, tox.WIDTH, tox.HEIGHT);
  tox.controller = new tox.Controller();
  tox.controller.init();
};

console.log(tox);
