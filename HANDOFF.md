# Personal site v3 scope report

## Asked vs delivered

Asked:

> The website is too static. There should be moving things on the website and it should be mroe intereactive on the UI. This will make it more interesting and make peopple look through on the website more.

Delivered:

- A moving skills strip, brief hero entrance and case transitions, with a pause and resume control and device reduced-motion support (answers “There should be moving things on the website”).
- Previous and next case controls and visible progress alongside the existing index and deep links (answers “more intereactive” and “make peopple look through on the website more”).
- A working, editable two-sentence extraction example. It illustrates the linked project by processing fictional or visitor-provided text in the page (answers “more intereactive on the UI”).
- The portrait-led design, three source links, career facts, résumé and contact links continue to support the original portfolio request and previous feedback.

Not asked, suggested:

- None.

Open questions for the owner:

- None for the local revision. Approval follows the owner’s review of the result.

Scope review: pass (independent harness-quality-reviewer, configured Sol High profile).

## Verification evidence

- Static checks passed for 24 link/asset references, unique IDs, heading/language/viewport, three requested repository destinations, profile/contact links, exact resume SHA-256, portrait alt text, local font/asset resolution and absence of rejected illustrations. JavaScript syntax passed.
- Actual desktop browser testing at 1176px verified a running skills animation, the Pause control freezing the exact transform across separate observations, and keyboard Resume. Short entrance and project animations were inspected in final CSS; their controls follow the same motion setting.
- Actual Previous/Next controls traversed all three cases, wrapped to the beginning and maintained the correct counter. Keyboard Enter and browser Back restored the correct project. On phone the index-return control preserved the selected case and focus.
- The local extraction demo processed multiline punctuation correctly and returned a clear empty-input message. Phone testing with the bundled fictional example produced the first two sentences. Text output uses textContent, not HTML insertion; no API call or form submission occurs.
- Phone widths 390px and 320px showed no horizontal overflow. The portrait, moving rail, project controls and editable demo were inspected. Browser warning/error logs were empty.
- Independent review tested both project controls, deep links/hash traversal, focus, modifier clicks, reduced-motion startup/runtime changes, HTML-like input, single-sentence and empty input. It inspected final desktop/phone screenshots and found no blocking issues. Scope review passed; verdict ready for owner review.
- OS reduced motion was tested in an isolated JavaScript harness and CSS media inspection, rather than a live OS-setting change. Without JavaScript all three case stories and the native static example remain available.
- The settled desktop screenshot was refreshed after the reviewer spotted a mid-entrance capture. The editable sample label now says it starts with a fictional example.
- This is a nongit artifact. Checks ran directly; no Git-hook enforcement is claimed.

## Approval

Ready for your approval. No hosting registration, remote push, publication or deployment has occurred. The work paused at the requested usage cutoff and resumed after the owner's explicit instruction; no reset token was used.

The local preview is http://127.0.0.1:4173 while the preview process is running. README.md explains restarting it or opening the static HTML directly. Release approval will include the portrait and downloadable resume with its contact details for the chosen audience.
