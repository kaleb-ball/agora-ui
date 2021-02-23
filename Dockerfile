#Builder Stage
FROM node:current-alpine as builder

WORKDIR /agora

COPY /package.json /yarn.lock /agora/

RUN yarn install

COPY ./ /agora/

RUN yarn run build

# Configure NGINX Web Server

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /agora/build/ /usr/share/nginx/html/agora/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]