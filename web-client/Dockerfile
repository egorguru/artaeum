FROM node
MAINTAINER Egor Repnikov

ADD ./node_modules/ /app/node_modules/
ADD ./server/ /app/server/
ADD ./build/ /app/build/

CMD ["node", "/app/server/index.js"]

EXPOSE 80
