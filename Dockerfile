# build environment
FROM node:14.15.4-alpine as build
ARG ENV
ARG VERSION
ARG API_HOST
ENV REACT_APP_ENV "$ENV"
ENV REACT_APP_VERSION "$VERSION"
ENV REACT_APP_API_HOST "$API_HOST"
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.17.6-alpine-perl
ENV UPSTREAM "drill-admin:8090"
# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/ /etc/nginx/
RUN addgroup nginx root
# setup wait utility
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
USER nginx
COPY --from=build /app/build /usr/share/nginx/html
RUN rm -v /etc/nginx/nginx.conf
COPY nginx /etc/nginx/

EXPOSE 8080
CMD /wait && /bin/sh -c "envsubst < /etc/nginx/upsteam.conf.template > /etc/nginx/upstream.conf && exec nginx -g 'daemon off;'"
