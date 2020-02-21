############################
# Build container
############################
FROM node:10-alpine AS dep

WORKDIR /ops

RUN apk add python

ADD package.json .
RUN npm install

ADD . .

RUN mkdir lib

RUN npm run build

############################
# Final container
############################
FROM registry.cto.ai/official_images/node:latest
# FROM node:10-alpine

WORKDIR /ops

RUN apt-get update && \
    apt-get install -y  git && \
    npm install -g typescript && \
    npm install -g ts-node @types/node && \
    npm install -g gatsby-cli && \
    npm install -g express-generator

COPY --from=dep /ops .
