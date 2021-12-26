# Osakemyrsky

![verify workflow](https://github.com/penny-five/osakemyrsky/actions/workflows/verify.yml/badge.svg)

<br>

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
sh bootstrap.sh
```

This performs the following things:

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

To execute tasks locally, an authorized service account is required.

1. Create a new service account

2. Add service account ID to `AUTHORIZED_SERVICE_ACCOUNTS` environment variable on `@osakemyrsky-server`

3. Generate ID token for the service account (see `https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/generateIdToken`)

4. Invoke a task endpoint (e.g. `GET http://localhost:8000/api/tasks/process-orders`) with the ID token set as bearer token

## Production environment

TODO

## Improvement ideas

Here I list various improvement ideas.

### Technical

- Replace `class-validator` with `zod` (https://github.com/colinhacks/zod) on `@osakemyrsky-server`
- Use ESM on `@osakemyrsky-server` (see https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## License

MIT.
