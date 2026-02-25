# 🎭 Playwright Initial Project With BDD

This repository contains my first complete automation framework using **Playwright** and **Cucumber** for **BDD** approach.  
It includes the full migration of the tests from my previous Playwright-only project [playwright-initial-project](https://github.com/BernardoSJ/playwright-initial-project), it follows all the best practices applied such as a **Page Object Model (POM)** architecture and also using Gherkin language to follow the right Cucumber sintax.

---

## 🚀 How to Run the Project

Run the following commands in your terminal:

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/BernardoSJ/playwright-initial-project-bdd.git
   ```
2. **Navigate to the project folder and install dependencies (only the first time):**
   ```bash
   cd playwright-initial-project-bdd
   npm install
   ```
3. **Run tests without specifying a browser**
   ```bash
   npm run cucumber
   ```
4. **Execute specific test suites within a specific browser by tag(e.g., @cart, @checkout, @inventory) and browser(e.g., cucumber:chromium)**
   ```bash
   npm run cucumber:chromium -- --tags @checkout
   ```

## ⚙️ GitHub Actions CI

This project includes a **GitHub Actions** workflow to run Playwright tests in CI.
* Workflow name: **Playwright E2E Cucumber**.
* Triggers: 
   * **workflow_dispatch**.
   * **push** to main.
   * **pull_request** to main.
* **PRs** executes only @checkout faster in chromium.
* **Push/manual** matrix for browser (**Chromium**, **Firefox**, **WebKit**).
* **Artifacts**:
   * **HTML report** reports/cucumber.
   * On failure after retry: **trace.zip** and **video.webm** (from test-results/**)


## 📊 Cucumber BDD Reports

Every cucumber execution generates an **Allure HTML report** under:

```bash
allure-report
```
⚠️ Do not open the report by double-click index.html.
This may cause the UI to stay in Loading... due to browser security restrictions.
Instead open it using:
```bash
npm run allure:open
```
This starts a local server and renders the report correctly.

### CI Behavior

If a scenario fails, the pipeline job will fail with exit code 1.
Howevertest artifacts (Allure results, reports, traces, videos) are always uploaded using if: always()

## ✅ Current Test Coverage

**Implemented modules using Gherkin language:**
* **Login**
* **Inventory**
* **Cart**
* **Checkout (data-driven)**

## 🧩 Project Structure

```text
playwright-initial-project-bdd/
  ├── pages/                # Page Object Models for reusability
  ├── features/             # End-to-end test specifications using Gherkin Language (Included network mocking with page.route)
  ├── fixtures/             # custom fixtures
  ├── utils/                # Data builder and helpers
  ├── package.json          # Dependencies and npm scripts
  ├── src
       ├── steps/           # Step implementation for the instructions defined within the .feature files
       ├── support/         # Support files used by Cucumber (World, hooks, env setup)
  ├── cucumber.js           # Cucumber configuration
  └── tsconfig.json         # TypeScript configuration
```

## 🧪 Network Mocking (page.route)
This repo includes a didactic example using page.route to intercept and fulfill a JSON response, demonstrating network control without a real backend.

**Run only the mock test:**
```bash
npm run cucumber:chromium -- --tags @mock
```

## 🧠 Key Concepts Applied

* Behavior-Driven Development (BDD) using Cucumber + Gherkin language.
* Modular Page Object Model (POM) for maintainability and reusability.
* Custom World implementation for sharing Playwright context, browser, and page.
* Browser parametrization via environment variable (chromium / firefox / webkit).
* Steps with clean responsibilities.
* Backgrounds for scenarios with initial common state.
* Scenario Outlines + Examples for data-driven tests.
* Dynamic test data generation using Faker.js.
* Network mocking with page.route.
* Explicit sync via expect() instead of manual waits.
* Isolated scenarios (no dependencies among features, neither steps).
* HTML + JSON report generation included in every run.
* Code formatting & linting using Prettier.
* Consistent naming conventions for steps, POM, and features.

## ⚠️ Limitations & Considerations

* Playwright does not natively integrate Cucumber—the runner used is pure Cucumber and requires additional configuration.
* Cucumber does not parallelize scenarios by default (unless external runners or multiple jobs in CI are added).
* Some features of Playwright's native runner are not available here:
    * No "test.steps()"
    * No advanced fixtures
* Handling trace/video requires additional code in hooks.
* Network mocking with "page.route" does not bypass CORS restrictions.
* "page.route" only intercepts browser traffic, not calls from the backend.
* Executions may be slightly slower than with "@playwright/test" due to Cucumber overhead.
* Step autocompletion in TypeScript is more limited compared to Playwright Test Runner.

## 🧑‍💻 Author

**Bernardo Salinas Jáquez**
Quality Assurance Engineer | Test Automation | Playwright | JavaScript | TypeScript<br>
📍 Practice project for strengthening E2E automation skills with Playwright.
