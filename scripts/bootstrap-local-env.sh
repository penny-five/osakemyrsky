#!/bin/bash

yarn install &&
  (cd .. && yarn bootstrap) &&
  (cd ../packages/@osakemyrsky-backend && cp .env.template .env) &&
  (cd ../packages/@osakemyrsky-firebase-emulator && cp .env.template .env)
