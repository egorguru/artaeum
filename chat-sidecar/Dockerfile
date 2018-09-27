FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/chat-sidecar.jar /app/
CMD ["java", "-jar", "/app/chat-sidecar.jar"]

EXPOSE 8001
