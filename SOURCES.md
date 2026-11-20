# Content sources

Project sources were checked on 17 November 2026. Experience sources were checked on 18 November 2026.

- **Experience and education:** The supplied résumé supports Fleet AI, Royal Bank of Canada, Autodesk, Planning Intelligence Group, Saige, and Western University. The supplied Simplify screenshots add One Human Service Network and give more detail for RBC, Autodesk, Planning Intelligence Group, and Saige. Western University completion is expected in April 2027. See the private harness report `reports/experience-source-audit-2026-11-18.md` for the source register.
- **Experience metrics:** The RBC 90% reduction refers to manual processing time for firewall change requests. The 75% reduction refers to issue-detection time for the validation dashboard. Autodesk's 76% to 91% metric is first-run pass rate. The 43% decline in failed datasets and 12% compute cost reduction apply to biweekly runs. The PySpark pipeline runtime fell from 9.0 to 7.4 hours.
- **Planning Intelligence Group and Saige:** The 35% query execution time reduction applies to the 50 Million Trees platform. The 20% reduction applies to the separate ALUS application. The sources support implementation of the waterfowl tracking system's data model and planning for the .NET-to-Laravel migration. Saige's 40% reduction refers to manual processing time for the pipeline that combined CSV and MySQL data.
- **Website Content Summarization:** [repository](https://github.com/KeeratGhuman/Website-Content-Summarization), README and `Scraper.py`. The source implements Google Custom Search page discovery, requests/BeautifulSoup text extraction, SeleniumBase fallback, first-two-sentence extraction, and pandas CSV export. The README explicitly describes the CSV as intended for WordPress import; no import is performed by the portfolio. The README calls it AI summarization; the site follows the implementation and does not claim an LLM.
- **TradeOps Reconciler:** [repository](https://github.com/harshikamboj/LAHacks), current README. A local hackathon prototype: React workbench, durable MongoDB Atlas checkpoints and Vector Search, simulated broker/custodian authorities, explicit approval and receipt verification. Its investigator is deterministic. No real financial transaction occurs. Repository documentation is evidence of the project's design; this portfolio does not independently certify its historical test results.
- **2Serious:** [repository](https://github.com/pushpinderSekhon10/2Serious), current README and Unity project structure. Three-level combat game, coins, health/damage upgrades and respawn. Keerat is named among the team acknowledgments. No supplied source establishes an individual feature contribution, so the site describes the team project without assigning individual ownership.
- **Job Pipeline:** [Rishabh Sharma's upstream repository](https://github.com/RishabhSFI/job-pipeline). The private harness notes `wiki/projects/job-pipeline.md` and `reports/cos-handoff-2026-11-19.md` document Keerat's matching configuration, verified Google Sheets read, and CI patch. The patch isolates scoring fixtures from the personal profile and removes password values from mail setup errors. The handoff records 316 passing tests and successful macOS and Windows install checks.

The extraction example uses fictional source text.

The downloadable résumé is byte-identical to the supplied PDF.

## Technical skills

The strip lists 85 unique skills from the supplied résumé, the owner-supplied role summaries in `reports/experience-source-audit-2026-11-18.md`, and the project sources above. The résumé's Sharpsight entry documents Claude API, LangGraph, Model Context Protocol (MCP), and FastMCP. The strip retains Airflow and MongoDB Atlas for the résumé's Apache Airflow and MongoDB entries. React.js, Node, MS SQL Server, and OCP4 appear as React, Node.js, SQL Server, and OpenShift.

- Languages and formats: Python, Java, JavaScript, TypeScript, HTML5, CSS, C#, C++, PHP, Assembly, SQL, NoSQL, YAML.
- Application development: FastAPI, Flask, Celery, React, Angular, Bootstrap, Streamlit, Node.js, Next.js, .NET, ASP.NET, Laravel, Eloquent ORM, Unity, REST APIs, OAuth 2.0, Responsive web design.
- Databases: PostgreSQL, MySQL, SQL Server, SQL Server Management Studio, MongoDB Atlas, Redis, Snowflake, Trino, Apache Hive.
- Data engineering and reporting: Data modeling, SQL query optimization, Stored procedures and triggers, ETL, Data quality testing, Airflow, Apache Spark, PySpark, Databricks, dbt, pandas, Looker, Power BI, Tableau, Google Sheets.
- Web data and AI: Web scraping, Google Custom Search, Requests, Beautiful Soup, SeleniumBase, TensorFlow, Voyage, AI evaluation, Claude Code, OpenAI Codex, OpenAI API, Claude API, LangGraph, Model Context Protocol (MCP), FastMCP.
- Development and deployment: Git, Docker, Kubernetes, OpenShift, AWS S3, AWS Lambda, CI/CD, GitHub Actions, Jenkins, Azure DevOps, Visual Studio.
- Enterprise tools: PAN-OS, NetBrain, AlgoSec FireFlow, Archer, ServiceNow.

## Redesign assets

- Portrait: the owner's supplied `IMG_0291.PNG`, located on Desktop after the supplied Downloads path was unavailable. Converted to a web JPEG with the original appearance retained; layout cropping is handled in CSS.
- Local display font: Barlow Condensed SemiBold from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowcondensed), distributed with its SIL Open Font License in `dist/assets/fonts/`.

## Interactive revision

The sample runs locally. It collapses whitespace, splits after sentence-ending punctuation followed by whitespace, and retains the first two sentences.
