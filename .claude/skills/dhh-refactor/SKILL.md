---
name: dhh-refactor
description: Refactors code in the style of DHH. Favors deleting code, plain names, and no speculative abstraction. Use when the user asks to refactor, simplify, clean up, or "make it DHH".
---

Refactor the target files (default: all project source) with these principles:

1. Delete first. Remove dead code, unused variables, redundant comments, and features nobody asked for.
2. Clarity over cleverness. Code should read like prose. Rename anything vague (`d`, `tmp`, `handle`) to what it actually is.
3. No speculative abstraction. Do not add config objects, classes, or helpers for a single use. Inline functions that are called once and add no clarity.
4. Do not chase DRY. Two similar lines beat a premature abstraction. Extract only after the third repeat.
5. Small, plain functions. One job each, named as verbs. No deep nesting; use early returns.
6. No new dependencies, no build step, no frameworks.
7. Keep comments only where the why is not obvious from the code.

Hard constraints:
- Do not change behavior. Same gameplay, same controls, same rendering.
- Keep the public interface: `init(canvas)`, `draw(ctx, state)`, state shape `{player, blocks, elapsed, over}` (plus any fields added since).
- Respect file ownership: only edit files the user named or that the current agent owns.
- Do not commit. The user commits.

Process:
1. Read the files. List the 3 to 5 biggest smells in a short list (file, line range, problem).
2. Apply the changes in one pass.
3. Run `bash .claude/skills/run-game/run.sh` to confirm it still parses and opens.
4. Report: lines before and after, what was deleted, what was renamed. Max 6 lines.
