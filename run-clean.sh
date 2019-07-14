#!/usr/bin/env bash
rm -rf blog/node_modules; rm blog/package-lock.json;
mvn clean -f gateway;
rm -rf media/node_modules; rm media/package-lock.json;
rm -rf profile/node_modules; rm profile/package-lock.json;
mvn clean -f registry;
rm -rf statistics/node_modules; rm statistics/package-lock.json;
mvn clean -f storage;
mvn clean -f uaa;
rm -rf web-client/node_modules; rm web-client/package-lock.json;
