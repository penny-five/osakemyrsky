#!/bin/sh

yarn install \
  && yarn bootstrap \
  && (cd ./packages/@osakemyrsky-server && cp .env.template .env) \
  && (cd ./packages/@osakemyrsky-firebase-emulator && cp .env.template .env)