FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/blog-sidecar.jar /app/
CMD ["java", "-jar", "/app/blog-sidecar.jar"]

EXPOSE 11001
