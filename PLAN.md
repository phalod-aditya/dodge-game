# Plan: "Dodge" browser game

## Context
`dodge-plan.md` specifies a small vanilla browser game. The repo has no commits and only that file. The parent `AGENTS.md` warns about Next.js, which doesn't apply because the spec forbids frameworks and build steps. I couldn't read the `dodge-game-0e` session's transcript, so this plan comes only from `dodge-plan.md`.

## Files (all in `dodge-game/`)
- `index.html`: a 600x400 `<canvas id="game">`, linking `style.css` and `game.js`.
- `style.css`: centers the canvas, dark background, canvas border. Nothing else.
- `game.js`: under 200 lines, split into small functions.

## game.js design
- State: `player {x,y,size,speed}`, `blocks[]`, `keys` (a Set of `e.code`), `elapsed`, `spawnTimer`, `over`.
- Input: `keydown`/`keyup` for Arrow keys and WASD. Space restarts only when `over`. Call `preventDefault` on arrows and Space to stop page scrolling.
- `spawn()`: pushes a red block at the top with a random x (`Math.random() * (W - size)`) and a speed that grows with `elapsed`. The spawn interval can also shrink with `elapsed`.
- `update(dt)`: moves the player and clamps it to the canvas, moves the blocks, removes blocks that have left the screen, and accumulates `elapsed` and `spawnTimer`. It calls `collide()` for each block and sets `over = true` on a hit.
- `collide(a, b)`: AABB overlap test that returns a boolean.
- `draw()`: clears the canvas, draws the player and blocks, and shows the score as whole seconds survived (`Math.floor(elapsed)`). When `over`, it shows the final score and "Press Space to restart".
- `reset()`: reinitializes the state.
- `loop(ts)`: `requestAnimationFrame` loop with `dt` in seconds, clamped (e.g. ≤0.05) so a backgrounded tab doesn't cause a jump. It skips `update` when `over`.

## Out of scope
The spec says "Do not add features I did not ask for", so there are no high scores, sound, pause, touch controls or difficulty menu.

## Verification
1. `wc -l game.js` shows under 200 lines.
2. Open `index.html` in a browser, using the Chrome tools or `open`. Check that:
   - The player moves with arrows and WASD and stays inside the canvas.
   - Blocks fall from random x positions and get faster over time.
   - A collision stops the game and shows the score and "Press Space to restart".
   - Space restarts with the score back at 0.
3. The console shows no errors. Nothing needs a build or install step.
