#!/usr/bin/env bash
npm install --prefix blog;
mvn package -DskipTests -f gateway;
npm install --prefix media;
mvn package -DskipTests -f profile;
mvn package -DskipTests -f registry;
npm install --prefix statistics;
mvn package -DskipTests -f storage;
mvn package -DskipTests -f uaa;
npm install --prefix web-client;
npm run build:ssr --prefix web-client;
