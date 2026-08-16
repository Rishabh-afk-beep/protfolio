# Connect Project to GitHub

## Goal
Sync this Lovable project to a new GitHub repository using Lovable’s built-in Git sync.

## Steps

1. Open the GitHub connect flow
   - In the Lovable editor, click the **Plus (+)** menu in the chat input (bottom-left).
   - Select **GitHub → Connect project**.

2. Authorize GitHub
   - Approve the Lovable GitHub App when prompted.

3. Create the repository
   - Choose the GitHub account or organization.
   - Enter a repository name.
   - Select public or private visibility.
   - Click **Create Repository**.

4. Verify sync
   - Confirm the repository appears in GitHub and contains the latest project files.
   - Future edits in Lovable will push to GitHub automatically.

## Notes
- This uses Lovable’s two-way Git sync, not the GitHub API connector.
- No code changes are required in the project; the action is performed through the Lovable editor UI.
- If you later want to edit code outside Lovable, clone the repo and push changes — they will sync back into the project.