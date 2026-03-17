# CI/CD Pipeline using Azure DevOps

A simple, production-like **Node.js (Express)** service with **automated Build → Test → Deploy** stages using **Azure DevOps Pipelines**. This repo is designed as a clean CI/CD demo suitable for interviews, portfolios, and hands-on practice.

## CI/CD workflow (high level)

On every push to the `main` branch, the Azure Pipeline:

- **Build**: restores caches, installs dependencies, and runs a lightweight build step
- **Test**: runs Jest tests with Supertest against the Express app
- **Deploy (mock)**: runs only if prior stages succeed and simulates deployment

## Architecture diagram (text-based)

```
Developer
  |
  |  git push (main)
  v
Azure Repos / GitHub Repo
  |
  v
Azure Pipelines (ubuntu-latest)
  |
  +--> Stage: CI
  |       |
  |       +--> Job: Build
  |       |      - Use Node.js
  |       |      - Cache npm + node_modules
  |       |      - npm ci
  |       |      - "Build application" (demo step)
  |       |
  |       +--> Job: Test
  |              - Use Node.js
  |              - Cache npm + node_modules
  |              - npm ci
  |              - npm test (Jest + Supertest)
  |
  +--> Stage: Deploy (runs only if CI succeeded)
          |
          +--> Job: Deploy
                 - echo "Deploying application" (mock)
```

## Tools & technologies

- **Runtime**: Node.js 18+
- **Web framework**: Express
- **Testing**: Jest, Supertest
- **CI/CD**: Azure DevOps Pipelines (`azure-pipelines.yml`)
- **Caching**: Azure Pipelines cache task for npm cache + `node_modules`

## Project structure

```
.
├─ app/
│  ├─ app.js          # Express app factory (routes + middleware)
│  └─ server.js       # HTTP server entrypoint (port 3000)
├─ tests/
│  └─ app.test.js     # Jest + Supertest tests for API
├─ azure-pipelines.yml
├─ package.json
└─ README.md
```

## Run locally

### Prerequisites

- Node.js **18+**
- npm **9+** (bundled with Node)

### Install & run

```bash
npm install
npm test
npm start
```

### Verify endpoints

- **GET /**: `http://localhost:3000/` → `{ "message": "Hello CI/CD" }`
- **GET /healthz**: `http://localhost:3000/healthz` → `{ "status": "ok" }`

## Run the pipeline in Azure DevOps

### 1) Create a project and connect your repo

- Create a project in Azure DevOps
- Push this repository to **Azure Repos** (or connect GitHub)

### 2) Create the pipeline

- Go to **Pipelines → Create Pipeline**
- Select your repo
- Choose **Existing Azure Pipelines YAML file**
- Select `azure-pipelines.yml` from the repository root

### 3) Run it

- Save and run the pipeline
- Push a commit to `main` to trigger it automatically

### Expected stage behavior

- **CI stage** runs **Build** then **Test**
- **Deploy stage** runs **only if** CI succeeds

## Sample output

### App response

```json
{ "message": "Hello CI/CD" }
```

### Jest test output (example)

```text
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Time:        ~1-5 s
```
