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
# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/ /etc/nginx/
RUN addgroup nginx root
USER nginx

COPY --from=build /app/build /usr/share/nginx/html
RUN rm -v /etc/nginx/nginx.conf
COPY nginx /etc/nginx/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

