# Vacation Portal

Please review the [Assignment](Assignment.md) document for the detailed business requirements of this assignment.

## Getting Started

1. **Environment Setup**
   - Copy the example environment file to create your own configuration:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and update the values as needed for your local setup.
   - For a standard Docker setup, copying `.env.example` as-is is enough.
2. **Project Lifecycle Commands**
  - Use the provided `run` script to manage the project:
    - **Build the project (install dependencies, migrate, seed):**
      ```sh
      ./run build
      ```
    - **Start the project:**
      ```sh
      ./run start
      ```
    - **Stop and remove containers and volumes:**
      ```sh
      ./run teardown
      ```
    - **Run backend checks:**
      ```sh
      ./run check-be
      ```
    - **Run frontend checks:**
      ```sh
      ./run check-fe
      ```
    - **Run QA / Cypress checks:**
      ```sh
      ./run check-qa
      ```

You will need to first execute the `./run build` command before starting the project for the first time. Then you can
use the `./run start` command to start the project. The `./run teardown` command can be used to stop and remove all
containers and volumes (clean-up). Finally, while the project is running, you can use the `./run check-xx` command to
run the automated checks.

3. **You can now visit the URL**: `http://localhost:5173` and access the project.

The following test users can be used to log in:

| Role     | Email                  | Password         | Name          |
|----------|------------------------|------------------|---------------|
| Manager  | manager@example.com    | managerpass123   | Manager User  |
| Employee | employee@example.com   | employeepass123  | Employee User |

4. **Manually testing the API**
   - Example login request:
     ```sh
     curl -v -X POST http://localhost:8080/auth/login \
       -H "Content-Type: application/json" \
       -d '{"email": "manager@example.com", "password": "managerpass123"}'
     ```
   - Alternatively you can use the `./test_routes.sh` script inside the `be` folder to test all the API routes.

Refer to the `run` script for more details on each command.

## Troubleshooting

- **Login returns a 500 right after `./run build`.** Almost always a MySQL
  init race, not a bug in your code: the db container can report healthy
  before its entrypoint finishes creating the app database and user, so the
  backend starts against a half-initialized database (look for
  `Access denied for user 'vacation'@'...'` in the `vacation_be` logs).
  Fix by rebuilding from a clean state:
  ```sh
  ./run teardown && ./run build
  ```

## Repository layout

| Folder | Purpose | More info |
|--------|---------|-----------|
| `be/` | REST API, database migrations, and seeds | [be/README.md](be/README.md) |
| `fe/` | React UI served at http://localhost:5173 | [fe/README.md](fe/README.md) |
| `qa/` | Cypress E2E tests | [qa/README.md](qa/README.md) |

