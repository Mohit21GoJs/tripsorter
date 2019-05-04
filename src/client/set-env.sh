#!/bin/sh

sed   "s#\#\#APP_API_URL\#\##${APP_API_URL}#g" ./src/env.base.js > ./src/env.js
