FROM node:alpine
MAINTAINER Jermine.hu@qq.com
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . $APP_HOME
RUN  npm install -g cnpm --registry=https://registry.npm.taobao.org ;\
     cnpm install -g yarn ;\
     yarn install -g @angular/cli ;\
     yarn install ;\
     cnpm run build ;\
     pwd && ls -alh dist
FROM jermine/nginx
ENV APP_HOME /app
MAINTAINER Jermine.hu@qq.com
WORKDIR $APP_HOME
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=0 $APP_HOME/dist .
