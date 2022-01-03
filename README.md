# Osakemyrsky

<div align="center">
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/typescript-icon.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/nextjs-icon.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/nestjs.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/graphql.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/apollostack.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/firebase.svg"/>
  <img height="40" width="50" src="https://cdn.svgporn.com/logos/google-cloud.svg"/>
</div>

<br>

![verify workflow](https://github.com/penny-five/osakemyrsky/actions/workflows/verify.yml/badge.svg)

Browser based game where players compete in the stock market. Uses actual stock price data.

Very, very much **work in progress**.

## Local development environment

### Prerequisites

- Docker
- Node.js 16
- Google Cloud Platform project

### Getting started

To get started, run:

```sh
chmod +x ./scripts/bootstrap.sh
./scripts/bootstrap.sh
```

The script does the following things:

- Installs dependencies
- Bootstraps the Lerna project
- Creates a `.env` file under each package

Once this is done, fill in the missing values to each `.env` file.

### Local port mappings

| Service                     | Address          |
| --------------------------- | ---------------- |
| @osakemyrsky/client         | `127.0.0.1:8000` |
| @osakemyrsky/server         | `127.0.0.1:8020` |
| Firebase emulator UI        | `127.0.0.1:4000` |
| Firebase Firestore emulator | `127.0.0.1:4040` |

### Commands

#### Start development environment

```sh
yarn dev:start
```

#### Stop development environment

```sh
yarn dev:stop
```

#### Destroy development environment

```sh
yarn dev:destroy
```

This stops and destroys all containers and volumes.

### Executing tasks

To execute tasks locally, use a http client such as `curl` or `httpie`.

### Processing orders

To invoke order processing task with `httpie` run:

```sh
http POST localhost:8020/tasks/process-orders
```

### Updating balances

To invoke balance updating task with `httpie` run:

```sh
http POST localhost:8020/tasks/update-balances
```

## Cloud environments

### Creating the ops environment

Ops project is used for environment specific Terraform state buckets and for building & storing artifacts that are shared between environments.

Use the following steps to setup the ops project:

1. Create a new project on Google Cloud Platform

2. Set the project ID as environment variable:

   ```sh
   export GCP_OPS_PROJECT_ID=my-ops-project
   ```

3. Run the setup script to setup the ops project:

   ```sh
   chmod +x ./scripts/setup-ops-project.sh
   ./scripts/setup-ops-project.sh
   ```

   The script does the following things:

   - Enables all required APIs in the ops project
   - Creates a new Docker repository in Artifact Registry
   - Creates a service account (`image-builder@${GCP_OPS_PROJECT_ID}.iam.gserviceaccount.com`) that can be used creating new jobs in Cloud Build.

### Creating a new environment

Use the following steps to initiate a new cloud environment (e.g. `dev`, `prod`):

1. Create a new project on Google Cloud Platform

2. Set the project ID as environment variable:

   ```sh
   export GCP_ENV_PROJECT_ID=my-project
   ```

3. Set the ops project ID as environment variable:

   ```sh
   export GCP_OPS_PROJECT_ID=my-ops-project
   ```

4. Run the setup script to setup the new environment:

   ```sh
   chmod +x ./scripts/setup-env.sh
   ./scripts/setup-env.sh
   ```

   The script does the following things:

   - Enables all required APIs in the environment project
   - Creates a Terraform state bucket in the ops project for the new environment
   - Creates a Terraform service account in the environment project
   - Grants the service account write access to the state bucket
   - Grants the service account all required permissions

#### Firestore single-field index exemptions

It is currently [not possible](https://github.com/hashicorp/terraform-provider-google/issues/7593) to set Firestore single-field index exemptions via Firestore REST API or Terraform. Due to this limitation index exemptions have to be added manually for each environment from Google Cloud console. See https://console.cloud.google.com/firestore/indexes/singlefield.

| Collection ID | Field path | Query scope      | Index     |
| ------------- | ---------- | ---------------- | --------- |
| transactions  | leagueId   | Collection group | Ascending |
| orders        | member.id  | Collection group | Ascending |
| orders        | status     | Collection group | Ascending |

## Improvement ideas

Here I list various improvement ideas.

### Technical

- Replace `class-validator` with `zod` (https://github.com/colinhacks/zod) on `@osakemyrsky-server`
- Use ESM on `@osakemyrsky-server` (see https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## License

MIT.
