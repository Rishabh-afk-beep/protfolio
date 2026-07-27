## Goal
Connect this Lovable project to GitHub and create a new repository so the codebase syncs automatically.

## Current state
- Project: Vite + React + TypeScript + shadcn/ui (`vite_react_shadcn_ts`)
- No GitHub connection is currently active
- Build script is available (`vite build`)

## Plan

### 1. Prepare the codebase (optional but recommended)
- Run a quick build/lint check to make sure the project compiles cleanly before it is pushed to GitHub.
- This avoids pushing broken code into the new repository.

### 2. Open the GitHub connection flow in Lovable
- In the Lovable editor, click the **Plus (+)** menu in the chat input (bottom-left).
- Select **GitHub** → **Connect project**.

### 3. Authorize and create the repository
- Authorize the Lovable GitHub App when prompted.
- Choose the GitHub account or organization where the repository should live.
- Pick a repository name (default is usually the project name).
- Choose public or private visibility.
- Click **Create Repository**.

### 4. Verify the sync
- Confirm the repository appears on GitHub with the current project files.
- Note that future changes made in Lovable will push to this repository automatically (two-way sync).

## Notes
- This uses Lovable's built-in Git sync, not the GitHub App connector for runtime API calls.
- Database data is not included in the code sync; it can be exported separately from Cloud → Advanced settings → Export data if needed later.
- Only one GitHub account can be connected to a Lovable account at a time.