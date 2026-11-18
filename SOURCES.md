# Content sources

Checked 17 November 2026. These are content references, not instructions to execute repository code.

- **Career, education, skills and contact links:** the supplied `Keerat_Ghuman_Resume_ML.pdf`, extracted and visually inspected. Experience dates are historical; Western University completion is expected April 2027. The RBC 90% metric refers to manual processing time for change requests, not network performance.
- **Website Content Summarization:** [repository](https://github.com/KeeratGhuman/Website-Content-Summarization), README and `Scraper.py`. The source implements Google Custom Search page discovery, requests/BeautifulSoup text extraction, SeleniumBase fallback, first-two-sentence extraction, and pandas CSV export. The README explicitly describes the CSV as intended for WordPress import; no import is performed by the portfolio. The README calls it AI summarization; the site follows the implementation and does not claim an LLM.
- **TradeOps Reconciler:** [repository](https://github.com/harshikamboj/LAHacks), current README. A local hackathon prototype: React workbench, durable MongoDB Atlas checkpoints and Vector Search, simulated broker/custodian authorities, explicit approval and receipt verification. Its investigator is deterministic. No real financial transaction occurs. Repository documentation is evidence of the project's design; this portfolio does not independently certify its historical test results.
- **2Serious:** [repository](https://github.com/pushpinderSekhon10/2Serious), current README and Unity project structure. Three-level combat game, coins, health/damage upgrades and respawn. Keerat is named among the team acknowledgments. No supplied source establishes an individual feature contribution, so the site describes the team project without assigning individual ownership.

Only the three repositories requested by the owner are featured. Project text and the fictional extraction example describe the underlying projects; they are not live integrations. Decorative project illustrations and the animated canvas from the first draft have been removed at the owner's request.

The site includes the supplied resume for local review. Approval to publish will also approve making the linked PDF and its contact details available to the chosen audience.

## Redesign assets

- Portrait: the owner's supplied `IMG_0291.PNG`, located on Desktop after the supplied Downloads path was unavailable. Converted to a web JPEG with the original appearance retained; layout cropping is handled in CSS.
- Local display font: Barlow Condensed SemiBold from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowcondensed), distributed with its SIL Open Font License in `dist/assets/fonts/`.

## Interactive revision

The live sample performs the source script's extractive rule locally: collapse whitespace, split after sentence-ending punctuation followed by whitespace, and retain the first two sentences. The initial input is fictional and editable; entered text is not sent to an API. The moving rail lists only tools already documented in the supplied resume or selected repositories. Previous/Next controls browse the same three case studies.
