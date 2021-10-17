# osakemyrsky

TODO

## Development environment

### Prerequisites

- Docker
- Node 14.x.x

### Getting started

Bootstrap the development environment with:

```
yarn bootstrap
```

### Commands

#### Start development environment

Start local development environment with:

```sh
yarn dev:start
```

Local port mappings:

| Service             | Address          |
| ------------------- | ---------------- |
| @osakemyrsky/client | `127.0.0.1:8090` |
| @osakemyrsky/server | `127.0.0.1:8095` |
| Database            | `127.0.0.1:8099` |

#### Stop development environment

Stop local development environment with:

```sh
yarn dev:stop
```

#### Destroy development environment

Stop & destroy all containers and volumes:

```sh
yarn dev:destroy
```

## Production environment

### Generating JWT signing keys

Both client and server require private JWK's for signing JWT's. The keys can be easily generated with:

```sh
npm install -g node-jose-tools && jose newkey --size 256 --ec -a ES256
```
