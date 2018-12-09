FROM java:8-jre
MAINTAINER Egor Repnikov

ADD ./target/config.jar /app/
CMD ["java", "-jar", "/app/config.jar", "-XX:+UseSerialGC", "-Xss512k", "-Xmx72m"]

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:8888/actuator/health || exit 1

EXPOSE 8888
