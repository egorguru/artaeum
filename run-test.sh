#!/usr/bin/env bash
npm run test --prefix blog;
mvn test -f gateway;
npm run test --prefix media;
mvn test -f profile;
mvn test -f registry;
npm run test --prefix statistics;
(cd storage; sbt test);
mvn test -f uaa;
