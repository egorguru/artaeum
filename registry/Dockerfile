FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/registry.jar /app/
CMD ["java", "-jar", "/app/registry.jar"]

EXPOSE 8761
