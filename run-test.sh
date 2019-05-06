#!/usr/bin/env bash
npm run test --prefix blog;
mvn test -f gateway;
mvn test -f profile;
mvn test -f registry;
npm run test --prefix statistics;
mvn test -f storage;
mvn test -f uaa;
