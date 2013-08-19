var tox = tox || {};

var States = {
  MENU: 0,
  PLAY: 1
}

tox.WIDTH = 800;
tox.HEIGHT = 600;
tox.STAT_PANEL_BG = '#000000';
tox.HP_BAR_COLOR = '#f00';

$(function() {
  tox.init();
});

tox.step = function() {
  var camCenter = {
    x: tox.player.drawPos.x,
    y: tox.player.drawPos.y
  };
  if (tox.controller.mouse.rightPressed) {
    var target = tox.level.convertToAbsolute({
      x: tox.controller.mouse.x + camCenter.x - tox.WIDTH/2, 
      y: tox.controller.mouse.y + camCenter.y - tox.HEIGHT/2 
    });
    tox.player.runTo(target.x, target.y);
  }
  else {
    tox.player.stop();
  }
  tox.ctx.save();
  tox.ctx.translate(tox.WIDTH/2 - camCenter.x, tox.HEIGHT/2 - camCenter.y);
  tox.ctx.moveTo(0, 0);
  tox.entityManager.update();
  tox.ctx.fillStyle = 'black';
  tox.ctx.fillRect(camCenter.x - tox.WIDTH/2, camCenter.y - tox.HEIGHT/2, tox.WIDTH, tox.HEIGHT);
  //tox.level.debugDraw(tox.ctx);
  tox.level.draw(tox.ctx);
  tox.entityManager.draw(tox.ctx);
  tox.ctx.restore();
  tox.drawGui();
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

tox.drawGui = function() {
  var statBarHeight = tox.HEIGHT / 3;
  var statBarWidth = statBarHeight / 6;
  var statPanelX = tox.WIDTH - statBarWidth;
  var statPanelY = tox.HEIGHT - statBarHeight;
  
  var padding = 4;

  // outline
  tox.ctx.fillStyle=tox.STAT_PANEL_BG;
  tox.ctx.fillRect(statPanelX, statPanelY, statBarWidth - padding, statBarHeight - padding);

  tox.player.hp = 100;

  // hp
  if (tox.player.hp > 0) {
    var hpBarHeightMax = (statBarHeight - (3 * padding)); 
    var hpBarHeightCurrent = hpBarHeightMax * (tox.player.hp / 100.0); 
    var hpBarTopLeftY = statPanelY + padding + hpBarHeightMax - hpBarHeightCurrent;
    var hpBarWidth = statBarWidth - (3 * padding);

    tox.ctx.fillStyle=tox.HP_BAR_COLOR;
    tox.ctx.fillRect(statPanelX + padding, hpBarTopLeftY, hpBarWidth, hpBarHeightCurrent);
  }
};

console.log(tox);
