var W = 600, H = 400;
var game = {};
var keys = new Set();
var lastTs = 0;

function reset() {
  game.player = { x: W / 2 - 15, y: H - 40, size: 30, speed: 280 };
  game.blocks = [];
  game.elapsed = 0;
  game.spawnTimer = 0;
  game.over = false;
  game.paused = false;
}

function spawn() {
  var size = 20 + Math.random() * 30;
  game.blocks.push({
    x: Math.random() * (W - size),
    y: -size,
    size: size,
    speed: 120 + game.elapsed * 12 + Math.random() * 60
  });
}

function collide(a, b) {
  return a.x < b.x + b.size && a.x + a.size > b.x &&
         a.y < b.y + b.size && a.y + a.size > b.y;
}

function movePlayer(dt) {
  var p = game.player;
  var dx = 0, dy = 0;
  if (keys.has('ArrowLeft') || keys.has('KeyA')) dx -= 1;
  if (keys.has('ArrowRight') || keys.has('KeyD')) dx += 1;
  if (keys.has('ArrowUp') || keys.has('KeyW')) dy -= 1;
  if (keys.has('ArrowDown') || keys.has('KeyS')) dy += 1;
  p.x = Math.max(0, Math.min(W - p.size, p.x + dx * p.speed * dt));
  p.y = Math.max(0, Math.min(H - p.size, p.y + dy * p.speed * dt));
}

function update(dt) {
  game.elapsed += dt;
  movePlayer(dt);

  game.spawnTimer += dt;
  var interval = Math.max(0.25, 0.8 - game.elapsed * 0.02);
  while (game.spawnTimer >= interval) {
    game.spawnTimer -= interval;
    spawn();
  }

  for (var i = game.blocks.length - 1; i >= 0; i--) {
    var b = game.blocks[i];
    b.y += b.speed * dt;
    if (b.y > H) {
      game.blocks.splice(i, 1);
    } else if (collide(game.player, b)) {
      game.over = true;
    }
  }
}

function draw(ctx, state) {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#4af';
  var p = state.player;
  ctx.fillRect(p.x, p.y, p.size, p.size);

  ctx.fillStyle = '#e22';
  state.blocks.forEach(function (b) {
    ctx.fillRect(b.x, b.y, b.size, b.size);
  });

  var score = Math.floor(state.elapsed);
  ctx.fillStyle = '#fff';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 10, 26);

  if (state.paused && !state.over) {
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Paused', W / 2, H / 2);
  }

  if (state.over) {
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Game Over', W / 2, H / 2 - 30);
    ctx.font = '24px sans-serif';
    ctx.fillText('Final score: ' + score + ' seconds', W / 2, H / 2 + 10);
    ctx.fillText('Press Space to restart', W / 2, H / 2 + 50);
  }
}

function onKeyDown(e) {
  var handled = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
  if (handled.indexOf(e.code) !== -1) e.preventDefault();
  if (e.code === 'Space' && game.over) {
    reset();
    return;
  }
  if (e.code === 'KeyP') {
    if (!e.repeat && !game.over) game.paused = !game.paused;
    return;
  }
  keys.add(e.code);
}

function onKeyUp(e) {
  keys.delete(e.code);
}

function init(canvas) {
  var ctx = canvas.getContext('2d');
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  reset();

  function loop(ts) {
    var dt = Math.min((ts - (lastTs || ts)) / 1000, 0.05);
    lastTs = ts;
    if (!game.over && !game.paused) update(dt);
    draw(ctx, game);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
