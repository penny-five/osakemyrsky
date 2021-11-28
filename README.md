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
- Node 16

### Getting started

Install necessary dependencies with:

```sh
yarn install
```

Then bootstrap the development environment with:

```sh
yarn bootstrap
```

### Commands

#### Start development environment

```sh
yarn dev:start
```

Local port mappings:

| Service              | Address          |
| -------------------- | ---------------- |
| @osakemyrsky/client  | `127.0.0.1:8090` |
| @osakemyrsky/server  | `127.0.0.1:8095` |
| Firebase emulator UI | `127.0.0.1:4000` |

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

### Generating JWT signing keys

Both client and server require private JWK's for signing JWT's. The keys can be easily generated with:

```sh
npm install -g node-jose-tools && jose newkey --size 256 --ec -a ES256
```

## License

MIT.