#!/usr/bin/env bash
set -euo pipefail

railway up --service taskflow-api
railway run npm run db:migrate --workspace @taskflow/api
