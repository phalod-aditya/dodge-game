---
name: run-game
description: Start the Dodge game locally. Use when the user runs /run-game or asks to run, start or play the game.
disable-model-invocation: true
---

Start the Dodge game on a local server.

1. From the project root, check the code first: `wc -l game.js && node --check game.js`. If the syntax check fails, report the error and stop.
2. Check whether port 8000 is already in use: `lsof -i :8000`. If a server is already running there, skip to step 4. Don't kill it.
3. Start the server in the background: `python3 -m http.server 8000`. Run it with the Bash tool's `run_in_background` so it doesn't block.
4. Open the game: `open http://localhost:8000/index.html`.
5. Tell the user the game is running at http://localhost:8000/index.html, and that the server keeps running until they stop it.
