#!/usr/bin/env bash
npm install --prefix blog;
npm install --prefix comment;
mvn package -DskipTests -f config;
mvn package -DskipTests -f gateway;
mvn package -DskipTests -f media;
mvn package -DskipTests -f profile;
mvn package -DskipTests -f registry;
npm install --prefix statistics;
mvn package -DskipTests -f storage;
mvn package -DskipTests -f uaa;
npm install --prefix web-client;
npm run build:ssr --prefix web-client;