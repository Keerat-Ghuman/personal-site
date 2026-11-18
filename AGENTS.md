# Personal website

A static portfolio with three engineering case studies and a downloadable résumé.

## Public

The repository is private, and the site has no live branch. Get the owner's explicit approval in the current session before any of these actions.

- Changing repository visibility.
- Deploying to production or publishing the site or its content.
- Changing live data in an external system.
- Sending emails or messages.
- Submitting job applications.

## Checks

`$until-ready` runs `.claude/gate.json`. The gate checks the syntax of `dist/portfolio.js` and then runs the security audit.

For UI changes, test the changed flows in a browser at 375 px and 390 px on phones and at 1440 px on desktop. Check keyboard navigation and visible focus. The gate covers JavaScript syntax and security review. Browser accessibility requires testing the site in a browser.

## Rules

- Preserve the site's content and assets unless the owner asks for changes. Keep existing user edits and private files intact.
- Keep secrets out of commits and command output.
- Use only the private `origin` for authorized pushes.
- Keep `.claude/loop/` ignored.
- Preserve the gate checks and browser QA requirements when fixing a failure.
