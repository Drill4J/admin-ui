# build environment
FROM node:12.2.0-alpine as build
ARG ENV
ARG VERSION
ENV REACT_APP_ENV "$ENV"
ENV REACT_APP_VERSION "$VERSION"
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.17.6-alpine-perl
COPY --from=build /app/build /usr/share/nginx/html
RUN rm -v /etc/nginx/nginx.conf
COPY nginx /etc/nginx/
# support running as arbitrary user which belogs to the root group
RUN touch /var/run/nginx.pid && \
  chown -R nginx /var/run/nginx.pid && \
  chown -R nginx /var/cache/nginx && \
  chown -R nginx /var/log/nginx && \
  chown -R nginx /usr/share/nginx/ && \
  chown -R nginx /etc/nginx/
RUN addgroup nginx root
USER nginx

EXPOSE 8080
CMD /bin/sh -c "envsubst < /etc/nginx/upsteam.conf.template > /etc/nginx/upstream.conf && exec nginx -g 'daemon off;'"


