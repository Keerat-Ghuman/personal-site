# Portfolio redesign QA

## Launch captures

| Capture | Pixels | What the Hub checked |
| --- | --- | --- |
| [Skills strip](launch-skills-375.jpg) | 375 × 812 | Local launch preview with the restored scrolling strip paused. |
| [Job Pipeline case](launch-job-pipeline-390.jpg) | 390 × 844 | Live v2 case leads with the personal workflow and credits the starter at the end. |
| [Hero](live-hero-390.jpg) | 390 × 844 | Live v2 introduction describes software and data engineering. |

The Hub checked the updated hero and cases at 390 px on the [published portfolio](https://keerat-ghuman-portfolio.eternalfairy1.chatgpt.site/). The hosted version uses a separately staged redacted Resume PDF. The private repository keeps its existing download PDF.

## Baseline captures

These earlier screenshots show the redesign before the launch updates. The Hub tested the loopback preview in the CUA in-app browser. At each CSS viewport, the page width matched the viewport without horizontal overflow. The JPEGs are the Hub's original captures.

| Viewport | Light theme | Dark theme | Flow captures |
| --- | --- | --- | --- |
| 375 × 812 | [Home](phone-light-375.jpg) | [Home](phone-dark-375.jpg) | [Work index](work-dark-375.jpg), [case reader](case-light-375.jpg), [experience](experience-dark-375.jpg) |
| 390 × 844 | [Home](phone-light-390.jpg) | [Home](phone-dark-390.jpg) | [Case reader](case-dark-390.jpg) |
| 1440 × 900 | [Home](desktop-light-1440.jpg) | [Home](desktop-dark-1440.jpg) | [Case reader](case-light-1440.jpg) |

## Observed behavior

- The theme button switched palettes, and dark mode persisted across reload. All measured visible interactive targets were at least 44 × 44 CSS px. Tab revealed the skip link with a visible focus outline.
- The native modal reader fit the three viewports without horizontal overflow. Previous and Next switched cases, reset scroll, and focused the current heading. Back closed the reader and restored the opening tile. Forward reopened the selected case. Escape and Close restored focus. The direct `#2serious` URL survived reload. Close returned to `#projects` and focused its tile.
- The demo extracted the first two sentences, retained edited input across case switches, and rendered markup as plain text. All six experience disclosures opened. Enter toggled Fleet AI with visible focus. Pause motion changed the control to Play motion. The Hub captured no console errors.

## Verification limits

Reduced-motion behavior, OS theme precedence, and the no-JavaScript fallback were source-reviewed. The live browser reported reduced motion off and was used with JavaScript enabled. The Hub tested phone-size viewports. Physical phones and older Safari were outside this run. In WebKit, native modal traversal can move focus to browser chrome. The Hub observed no focus on background page controls while the reader was open.

## Baseline gate and independent review

The final trusted Hub gate exited 0 after the Safari palette correction. JavaScript syntax passed, and the security audit's focused static review reported no findings. The audit's nested reviewer session failed to start. A separate read-only Astra high reviewer passed implementation and scope after verifying the literal palette fix. The unslop pass required no wording changes.

Hub records dated 19 November 2026 are `continue-site-browser-qa-2026-11-19.md` and `continue-site-hub-gate-final-2026-11-19.log`. Baseline JPEGs came from `reports/redesign-qa-final-2026-11-19` in the private harness. The five-file patch reviewed by the Hub has SHA-256 `08ada8150b0cfe54b18fda90c24c35182aab46b7f1a0d03dc8c4ae968f276437`, computed from `git diff --binary` against `d9bf13a` before adding this evidence.
