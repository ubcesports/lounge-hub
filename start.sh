#!/bin/bash

npx concurrently "cd app && npx nodemon app.js" "cd client && npm run dev"
