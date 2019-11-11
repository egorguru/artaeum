build:
	npm install --prefix blog
	mvn package -DskipTests -f gateway
	npm install --prefix media
	npm install --prefix profile
	mvn package -DskipTests -f registry
	mvn package -DskipTests -f storage
	mvn package -DskipTests -f uaa

clean:
	(rm -rf blog/node_modules; rm blog/package-lock.json)
	mvn clean -f gateway
	(rm -rf media/node_modules; rm media/package-lock.json)
	(rm -rf profile/node_modules; rm profile/package-lock.json)
	mvn clean -f registry
	mvn clean -f storage
	mvn clean -f uaa

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build "$@"

test:
	npm run test --prefix blog
	mvn test -f gateway
	npm run test --prefix media
	npm run test --prefix profile
	mvn test -f registry
	(cd storage; sbt test)
	mvn test -f uaa
