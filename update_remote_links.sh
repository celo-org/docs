#!/bin/bash

sleep 20
find ./docs/sdk -type f -name "*.md" -exec sed -i '' 's/docs\/blob\/.*\//celo-monorepo\/tree\/master\//g' {} +