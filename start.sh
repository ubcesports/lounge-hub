#!/bin/bash

npx concurrently "cd app && node app.js" "cd client && npm run dev"
