FROM node:16.13.0-alpine3.11 as builder

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

COPY public public

COPY --from=builder /build/.next .next

CMD ["yarn", "start"]