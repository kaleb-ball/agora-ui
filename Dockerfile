#Builder Stage
FROM node:current-alpine as builder

COPY /package.json /yarn.lock ./

RUN yarn install
RUN mkdir /agora

WORKDIR /agora

COPY . .

WORKDIR agora-ui

RUN yarn run build

# Configure NGINX Web Server

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder agora/public /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]