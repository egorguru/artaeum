#!/bin/bash
(cd uaa && mvn clean package -DskipTests)
(cd config && mvn clean package -DskipTests)
(cd gateway && mvn clean package -DskipTests)
(cd registry && mvn clean package -DskipTests)
(cd profile && mvn clean package -DskipTests)
(cd media && mvn clean package -DskipTests)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build "$@"