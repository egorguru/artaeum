[![Build Status](https://travis-ci.org/EgorRepnikov/artaeum.svg?branch=master)](https://travis-ci.org/EgorRepnikov/artaeum)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/EgorRepnikov/artaeum/blob/master/LICENCE)
# Artaeum - Microservice Social Network

## Overview
### Registry Service (Java)
Service Discovery - Spring Cloud Eureka.

### Gateway Service (Java)
Gateway API - Spring Cloud Zuul. Also, there is a feature of user authorization (works with UAA service).

### UAA (User Account and Authentication) Service (Java)
OAuth2 Server - Spring Cloud OAuth2. There is API for working with User's entities and User Account features like registration and activation.

### Blog Service (JavaScript)
Koa.js Service with Blog features containing Article API and Category API (depends on Article). All images are stored in Storage Service.

### Statistics Service (JavaScript)
Dragonrend.js Service contains only Statistics API.

### Media Service (JavaScript)
Koa.js Service contains Comment API and Like API.

### Profile Service (JavaScript)
Dragonrend.js Service contains Post API, Subscription API and API for storing Profile Images (depends on Storage Service).

### Storage Service (Scala)
Colossus Service. There is simple storage with basic authentication. It contains only Image API. Other services should use it for storing images.

### Web Client (Frontend) Service (Svelte/Sapper)
[Repository](https://github.com/EgorRepnikov/artaeum-frontend).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
