---
name: commit-this
description: Commit the current changes in this repo with a clear message. Use when the user runs /commit-this or asks to commit their work.
disable-model-invocation: true
---

Commit the current working tree changes.

1. Run `git status` and `git diff` (plus `git diff --staged`) to see what changed. If the repo has no commits yet, that's fine; the first commit is the root commit.
2. If there is nothing to commit, say so and stop.
3. Decide which files to commit. Skip anything that looks like a secret or local-only file (`.env`, credentials, editor settings).
4. Write a short commit message: an imperative subject line under about 70 characters, and a body only if the reason for the change isn't obvious from the diff. Match the style of `git log` if there is history.
5. **Get approval before staging or committing anything.** List the exact files that would be committed, each marked new, modified or deleted, and list any files you are leaving out and why. Show the proposed commit message. Then ask the user to approve with AskUserQuestion (options like "Commit these files" and "Change the list"). Don't stage or commit until they approve. If they change the list or message, show the updated list and ask again.
6. After approval, stage only the approved files by name. Don't use `git add -A` or `git add .`.
7. End the message with the attribution trailer that Claude Code's system reminder specifies for commits, if one is present.
8. Commit with `git commit`. Don't amend, don't skip hooks, and don't push.
9. Run `git status` and `git log -1 --stat`, then report the commit hash and what it contains. If a hook fails, report the failure and fix the cause. Don't bypass it.
