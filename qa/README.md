# Vacation Portal — QA / Cypress

This folder contains the end-to-end (E2E) test project used during **QA live-coding interviews**.

You will automate scenarios from the [Assignment](../Assignment.md) document against the running Vacation Portal application. The app itself is a stable reference implementation — your work happens here in `qa/`.

## Before you start

1. Read the [project README](../README.md) at the repository root and complete application setup.
2. Confirm you can open **[http://localhost:5173](http://localhost:5173)** in your browser.
3. Install dependencies and run Cypress from this folder (see below).

Implement your tasks as Cypress specs under `cypress/e2e/`.

## Cypress setup

Cypress is pinned to **15.9.0** — the last 15.x release before **15.10.0**, which started showing the `allowCypressEnv` / `Cypress.env()` migration warning. This project does not use `Cypress.env()`.

From this `qa/` directory:

```sh
npm install
```

If Cypress says the executable is missing, download the binary:

```sh
npx cypress install
```

Verify the setup spec passes (requires the app to be running):

```sh
npm test
```

### Interactive mode (recommended)

```sh
npm run cy:open
```

Choose **E2E Testing**, pick a browser, and run specs from `cypress/e2e/`.

### Headless mode

```sh
npm run cy:run
```

From the repository root, you can also run:

```sh
./run check-qa
```

This checks that the app is reachable and runs all Cypress specs headlessly.

## Project structure

```
qa/
├── cypress/
│   ├── e2e/              # Add your interview specs here
│   │   └── smoke/        # Setup verification (do not remove)
│   ├── fixtures/
│   │   └── users.json    # Seeded login credentials
│   └── support/
│       ├── commands.js   # Custom commands (cy.loginAs is provided)
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

## Writing tests

### Suggested conventions

- Place specs in `cypress/e2e/` grouped by feature (e.g. `auth/`, `vacations/`, `users/`).
- Use descriptive `describe` / `it` blocks that reflect [Assignment](../Assignment.md) scenarios.

### Confirm dialogs

Some actions use the browser `window.confirm` dialog (e.g. deleting a vacation request or user). **Cypress auto-accepts** `window.confirm` **by default** when nothing stubs it. The project also provides `cy.acceptConfirm()` in `commands.js` for explicit accept in write tasks — call it **immediately before** the click that opens confirm:

```js
cy.acceptConfirm()
cy.contains("button", "Delete").click()
```

To test cancel behaviour, stub with `cy.on('window:confirm', () => false)` before the click instead.

### Date inputs

Vacation request forms use `<input type="date">`. Use future dates in `YYYY-MM-DD` format.

### API proxy

The frontend proxies API calls to the backend via `/api/*`. Your tests interact with the **UI only** unless a task asks you to use `cy.request()` for test data setup.

## Troubleshooting

| Problem                                                     | Solution                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `Cypress executable not found` / `Please reinstall Cypress` | Run `npx cypress install` from the `qa/` folder                          |
| `Cypress failed to verify the server`                       | Run `./run start` from the repo root and wait for containers to be ready |
| Login fails                                                 | Confirm seeded users exist (`./run build` re-seeds the database)         |
| Tests pass locally but fail headless                        | Check for timing issues; avoid hard-coded waits                          |
| Port 5173 in use                                            | Stop other processes or adjust `baseUrl` in `cypress.config.js`          |

## Interview notes

- You do **not** need to modify application code in `fe/` or `be/` unless the interviewer explicitly allows it.
- Focus on **correctness, readability, and stable selectors**.
- Explain your approach as you work — for mid-level roles, **test design and trade-offs matter as much as syntax** (especially in the reflection block).
- Extra credit: reusable commands, Page Objects, `cy.intercept` for login/API sync, clear folder structure, edge cases.

Good luck!
