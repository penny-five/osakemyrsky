#!/bin/bash

import_dir=$(ls -t .cache | head -1)
export_dir=$(openssl rand -hex 12)

params=()
params+=("--project=${GCP_PROJECT_ID}")
params+=("emulators:start")
params+=("--export-on-exit ./.cache/${export_dir}")

if [ -n "$import_dir" ]
  then
    params+=("--import ./.cache/${import_dir}")
  fi

echo "${params[@]}"

eval "exec firebase ${params[@]}"
