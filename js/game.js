var tox = tox || {};

tox.WIDTH = 800;
tox.HEIGHT = 600;

$(function() {
  tox.init();
  tox.ctx.fillStyle = 'green';
  tox.ctx.fillRect(0, 0, tox.WIDTH, tox.HEIGHT);
});

tox.init = function() {
  tox.canvas = $('#gamecanvas').get(0);
  tox.ctx = tox.canvas.getContext('2d');
  tox.canvas.width = tox.WIDTH;
  tox.canvas.height = tox.HEIGHT;
};

console.log(tox);
