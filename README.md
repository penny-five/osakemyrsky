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

Browser based game where players compete in the stock market. Uses actual stock price data.

Very, very much **work in progress**.

## Development environment

### Prerequisites

- Docker
- Node.js 16

### Getting started

To get started, run:

```sh
sh bootstrap.sh
```

This will perform the following things:

- Install dependencies
- Bootstrap the Lerna project
- Create `.env` file under each package

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

## Production environment

TODO

## License

MIT.
