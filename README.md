# 🎭 Playwright Initial Project

This repository contains my first complete automation framework using **Playwright**.  
It automates functional tests for the demo web application [SauceDemo](https://www.saucedemo.com/), following a **Page Object Model (POM)** architecture.

---

## 🚀 How to Run the Project

Run the following commands in your terminal:

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/BernardoSJ/playwright-initial-project.git
   ```
2. **Navigate to the project folder and install dependencies (only the first time):**
   ```bash
   cd playwright-initial-project
   npm install
   ```
3. **Run tests in headed mode (browser visible):**
   ```bash
   npm run test:headed
   ```
4. **Run tests in headless mode with report generation:**
   ```bash
   npm run test:report
   ```
5. **Execute specific test suites by tag (e.g., @cart, @catalog, @logout):**
   ```bash
   npx playwright test --grep @cart
   ```
6. **Run on a specific browser**
   ```bash
   npx playwright test --project=chromium
   npx playwright test --project=firefox
   npx playwright test --project=webkit
   ```
7. **Open the most recent test report (after running all tests):**
   ```bash
   npm run report:full
   ```
8. **Open the report for the last single test module run:**
   ```bash
   npm run report
   ```

## ⚙️ GitHub Actions CI

This project includes a **GitHub Actions** workflow to run Playwright tests in CI.
* Workflow name: **Playwright E2E**.
* Triggers: 
   * **workflow_dispatch**.
   * **push** to main.
   * **pull_request** to main.
* **PRs** executes only @checkout faster in chromium.
* **Push/manual** matrix for browser (**Chromium**, **Firefox**, **WebKit**).
* **Artifacts**:
   * **HTML report** reports/html.
   * On failure after retry: **trace.zip** and **video.webm** (from test-results/**)


## 📊 Test Reports

Playwright automatically generates an **HTML report** for every test run.
   
Reports are stored under:
   ```bash
   /reports/html
   ```

To view the latest report:
   ```bash
   npm run report:full

   ```
When tests fail after a retry, Playwright also generates:
* ```texttrace.zip``` → full trace viewer
* ```textvideo.webmv``` → video of the failing test
(both under ```text/texttest-results```)


## ✅ Current Test Coverage

**Implemented modules:**
* **Login**
* **Inventory**
* **Cart**
* **Logout**
* **Checkout (data-driven)**

## 🧩 Project Structure

```text
playwright-initial-project/
  ├── pages/                # Page Object Models for reusability
  ├── tests/                # End-to-end test specifications (Included network mocking with page.route)
  ├── fixtures/             # custom fixtures
  ├── utils/                # Data builder and helpers
  ├── playwright.config.ts  # Playwright configuration file
  ├── package.json          # Dependencies and npm scripts
  └── tsconfig.json         # TypeScript configuration
```

## 🧪 Network Mocking (page.route)
This repo includes a didactic example using page.route to intercept and fulfill a JSON response, demonstrating network control without a real backend.

**Run only the mock test:**
```bash
npx playwright test --grep @mock
```

## 🧠 Key Concepts Applied

* Modular Page Object Model (POM) design.
* Parameterized fixtures for reusable test contexts.
* Selective test execution using tags (@login, @cart, @catalog).
* Promise handling and waitForURL() for reliable navigation.
* Dynamic locators and use of filter({ has: ... }) for stable element selection.
* Prettier formatting and npm scripts for consistency.
* Enable trace and video recording for debugging purposes.
* Data driven using Faker.js
* Zero manual waits applying ```text expect()``` for robust validations, assertions and automatic synchronization.
* Network mocking with page.route and simulated JSON

## ⚠️ Limitations And Considerations

* Network mocking does not bypass CORS automatically; behavior may differ from production setups.
* Service Workers or aggressive caching can prevent requests from reaching the network layer—disable or invalidate cache if needed.
* page.route intercepts browser-initiated requests (fetch, XHR, assets) only; it doesn’t mock server-side calls executed outside the browser context.
* Keep mocks scoped to tests/suites to avoid interference in parallel runs.

## 🧑‍💻 Author

**Bernardo Salinas Jáquez**
Quality Assurance Engineer | Test Automation | Playwright | JavaScript | TypeScript<br>
📍 Practice project for strengthening E2E automation skills with Playwright.
