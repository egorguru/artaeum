FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/config.jar /app/
CMD ["java", "-jar", "/app/config.jar"]

EXPOSE 8888
