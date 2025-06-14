
# K6 Performance Testing Toolkit

*Created by REDOWANE AHMED*
📧 [redowaneahmed@gmail.com](mailto:redowaneahmed@gmail.com)

---

## What is K6?

K6 is an open-source, developer-friendly load testing tool designed to simulate virtual users and measure how your website, API, or app performs under stress.

* Write tests in **JavaScript**
* Run thousands of virtual users efficiently
* Integrate seamlessly with CI/CD pipelines
* Get detailed performance insights

---

## Why Use K6?

| Reason                       | Explanation                              |
| ---------------------------- | ---------------------------------------- |
| **Simple Scripting**         | JavaScript — easy for developers         |
| **High Performance**         | Built with Go — lightweight & fast       |
| **Automation Ready**         | Works with GitHub Actions, Jenkins, etc. |
| **Local or Cloud Execution** | Run on your machine or use K6 Cloud      |
| **Rich Metrics & Reporting** | Built-in and customizable dashboards     |

---

## Quick Start: Installation & Running Your First Test

### Installation

* **Windows:** Download and add binary from [K6 website](https://k6.io/docs/getting-started/installation/)
* **macOS:**

  ```bash
  brew install k6
  ```
* **Linux (Debian/Ubuntu):**

  ```bash
  sudo apt update && sudo apt install k6
  ```
* **Docker:**

  ```bash
  docker run --rm -i grafana/k6 version
  ```

### Run a Sample Test

Download or create a simple script, e.g., `basic-step1.js`:

```js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('https://test-api.example.com');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

Run it using:

```bash
k6 run basic-step1.js
```

---

## Project Layout Snapshot

```plaintext
k6-performance-testing/
├── screenshots/              # Browser test screenshots
├── reports/                  # Generated performance reports (HTML)
├── basic-step1.js            # Simple load test example
├── browser-iteration.js      # Browser test with iterations
├── get-api-test.js           # API GET request validation
├── post-api.js               # API POST request test
├── stress-test.js            # Stress test scenarios
├── scenario.js               # Multi-scenario tests
├── report-generator.js       # Convert JSON to HTML reports
├── thresholds.js             # Performance thresholds & validations
└── verify-status-code.js     # API response status checks
```

---

## Note on Learning Phase

This repository is a **learning phase** project. It contains many individual modules and scripts to practice different aspects of performance, API, and browser testing with K6. You can explore, experiment, and improve gradually by running and modifying these scripts.

---

## Running Tests — Common Commands

| Purpose            | Script                | Command                     |
| ------------------ | --------------------- | --------------------------- |
| Basic GET API test | `get-api-test.js`     | `k6 run get-api-test.js`    |
| POST API test      | `post-api.js`         | `k6 run post-api.js`        |
| Browser form test  | `browser-test.js`     | `k6 run browser-test.js`    |
| Stress test        | `stress-test.js`      | `k6 run stress-test.js`     |
| Scenario test      | `scenario.js`         | `k6 run scenario.js`        |
| Report generation  | `report-generator.js` | *Run as needed after tests* |

---

## Tips for Effective Use

* Use thresholds (`thresholds.js`) to set pass/fail criteria
* Combine API and browser tests for full coverage
* Simulate different network conditions with `network-throttle.js`
* Review screenshots saved in `screenshots/` folder for browser tests

---

## Contributing

Want to contribute? Here's how:

1. Fork the repo
2. Create a new branch for your feature or fix
3. Commit your changes with clear messages
4. Open a pull request for review

---

## Contact & Support

**REDOWANE AHMED**
Email: [redowaneahmed@gmail.com](mailto:redowaneahmed@gmail.com)

LinkedIn: [https://www.linkedin.com/in/redowaneahmed/](https://www.linkedin.com/in/redowaneahmed/)

GitHub: [https://github.com/redowaneahmed27](https://github.com/redowaneahmed27)

---

*This repository enables you to learn and practice different K6 testing techniques step-by-step. Dive in and accelerate your learning and testing process!* 🚀