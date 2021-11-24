FROM nginx:alpine
ADD ./ ./usr/share/nginx/html
ADD ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80