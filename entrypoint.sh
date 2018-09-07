#!/bin/sh

set -ex

while ! nc -z database 3306; do
   sleep 1
done

if [ "$DEV" == "1" ]; then
   npm i
   npm run watch &
   cd client
   npm i
   npm run start
else
   npm run start
fi