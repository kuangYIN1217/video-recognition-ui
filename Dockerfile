FROM node:alpine
MAINTAINER Jermine.hu@qq.com
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . $APP_HOME
RUN  npm install -g yarn ;\
     yarn install -g @angular/cli ;\
     yarn install ;\
     npm run build ;\
     pwd && ls -alh
FROM jermine/nginx
ENV APP_HOME /app
MAINTAINER Jermine.hu@qq.com
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY dist/* $APP_HOME/
