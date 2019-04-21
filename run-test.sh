#!/usr/bin/env bash
npm run test --prefix blog;
npm run test --prefix comment;
mvn test -f config;
mvn test -f gateway;
mvn test -f media;
mvn test -f profile;
mvn test -f registry;
npm run test --prefix statistics;
mvn test -f storage;
mvn test -f uaa;