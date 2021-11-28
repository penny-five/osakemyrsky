#!/bin/bash

"firebase" \
  "--project=$GCP_PROJECT_ID" \
  "emulators:start" \
  "--only=firestore"