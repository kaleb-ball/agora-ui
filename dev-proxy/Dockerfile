FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx_proxy.conf /etc/nginx/conf.d/proxy.conf
COPY ./ssl/cert.crt /etc/ssl/cert.crt
COPY ./ssl/cert.key /etc/ssl/cert.key

EXPOSE 443 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]