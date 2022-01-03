FROM node:16.13.0-alpine3.11 AS builder

WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM node:16.13.0-alpine3.11

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production && yarn cache clean

COPY --from=builder /build/dist src

CMD ["yarn", "start"]
