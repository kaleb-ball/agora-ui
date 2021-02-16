#Builder Stage
FROM node:current-alpine as builder

COPY /package.json /yarn.lock ./

RUN yarn install
RUN mkdir /agora
RUN mv ./node_modules/ ./agora

WORKDIR /agora

COPY . .

WORKDIR btmi

RUN yarn run build

# Configure NGINX Web Server

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder agora/public /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]