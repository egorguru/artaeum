[![Build Status](https://travis-ci.org/EgorRepnikov/artaeum.svg?branch=master)](https://travis-ci.org/EgorRepnikov/artaeum)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/EgorRepnikov/arteaum.com/blob/master/LICENCE)
# Artaeum - Microservice Social Network

## Overview
### Registry Service (Java)
Service Discovery with Spring Cloud Eureka.

### Config Service (Java)
Configuration Server with Spring Cloud Config.

### Gateway Service (Java)
Gateway API with Spring Cloud Zuul (Java). Also it contains feature of user authorization (is works with UAA service).

### UAA (User Account and Authentication) Service (Java)
OAuth2 Server with Spring Cloud OAuth2. It contains API for working with User's entities and User Account features like registration and activation.

### Blog Service (JS)
Koa.JS Service with Blog features contains Article API and Category API (depends on Article). All images saves in Storage Service.

### Comment Service (JS)
Koa.JS Service contains only Comment API.

### Media Service (Scala)
Spring Boot Service was written with Scala. It contains only Like API.

### Profile Service (Java)
Java Spring Boot Service contains Post API, Subscription API and API for setting Profile Images (depends on Storage Service).

### Storage Service (Scala)
Spring Boot Service was written with Scala. This is simple storage with basic auth. It contains only Image API. Other services should use it for saving images.

### Web Client (Frontend) Service (Angular 7)
Angular 7 app with SSR (Angular Universe) and i18n (ngx-translate).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
