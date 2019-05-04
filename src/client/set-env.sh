#!/bin/sh

grep -rl 'APP' ./src | xargs sed -i "" "s#\#\#APP_API_URL\#\##${APP_API_URL}#g" 
