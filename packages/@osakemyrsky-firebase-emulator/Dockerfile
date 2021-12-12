FROM node:16.13.0-alpine3.14

ENV FIREBASE_TOOLS_VERSION=9.23.0

WORKDIR /firebase

RUN apk --no-cache add openjdk11 openssl bash && \
  npm install -g firebase-tools@${FIREBASE_TOOLS_VERSION} && \
  firebase setup:emulators:firestore

EXPOSE 8080

COPY firebase.json .
COPY start.sh .

RUN mkdir .cache

CMD [ "bash", "start.sh" ]