# Dodge

A small browser game: move a square with arrows or WASD and dodge falling red blocks. Spec is in `dodge-plan.md`, design notes in `PLAN.md`.

## Constraints
- Vanilla HTML, CSS and JS only. No frameworks, no build step, no dependencies.
- Files: `index.html`, `style.css`, `game.js`. Don't add others without asking.
- Canvas is 600x400.
- Keep `game.js` under 200 lines, split into small functions (`update`, `draw`, `spawn`, `collide`).
- Don't add features that weren't asked for (no high scores, sound, pause, touch controls, menus).
- The parent `voice-agents/AGENTS.md` is about Next.js and doesn't apply here.

## Interface
- `index.html` loads `game.js`, then calls `init(document.getElementById('game'))`.
- `game.js` exposes global `init(canvas)` and `draw(ctx, state)`.
- `state` is `{ player: {x, y, size}, blocks: [{x, y, size}], elapsed, over }`.
- The score (whole seconds survived) and "Press Space to restart" are drawn on the canvas by `draw`, not in HTML.

## Run and check
- Serve locally: `python3 -m http.server 8000` in this folder, then open http://localhost:8000/index.html.
- Check size and syntax: `wc -l game.js && node --check game.js`.
