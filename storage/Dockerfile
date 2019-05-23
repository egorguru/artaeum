FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/scala-2.12/storage.jar /app/
CMD ["java", "-jar", "/app/storage.jar"]

EXPOSE 10000
