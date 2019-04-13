#!/bin/sh

set -ex

echo "${GCP_CREDENTIALS}" > /app/client_secret.json
echo "${GCP_TOKEN}" > /app/credentials.json

while ! nc -z database-meetingroom 3306; do
   sleep 1
done

if [ "$DEV" == "1" ]; then
   npm i
   npm run watch &
   cd client
   npm i
   npm run build
   npm run start
else
   npm run start
fi