#!/bin/bash
# MongoDB container init script to add a new non-root user to the DB instance and seed the database with any existing data.
# Gets values from .env file which is injected through docker-compose.yml.

echo 'Creating application user and db'

mongo ${APP_MONGO_DB} \
  --host localhost \
  --port 27017 \
  -u ${MONGO_ROOT_USERNAME} \
  -p ${MONGO_ROOT_PASSWORD} \
  --authenticationDatabase admin \
  --eval "db.createUser({ user: '${APP_MONGO_USER}', pwd: '${APP_MONGO_PASS}', roles: [{ role: 'dbOwner', db: '${APP_MONGO_DB}' }] });"

echo 'Initializing data'

if [ -d "/seedData" ]
then
  echo "Directory exists"
  cd /seedData
  FILES=./*
  for f in $FILES
  do
    echo "Processing $f"
    mongoimport --db ${APP_MONGO_DB} --username ${APP_MONGO_USER} --password ${APP_MONGO_PASS} --file $f --jsonArray
  done
fi