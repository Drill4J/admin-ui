FROM nginx:1.17.6-alpine-perl

# Build args
ARG ENV
ARG VERSION

# Install Node and Yarn
RUN apk update && apk add yarn \
    && echo "NodeJS Version:" "$(node -v)" \
    && echo "Yarn Version:" "$(yarn -v)"

# Configure nginx
RUN rm -v /etc/nginx/nginx.conf
COPY nginx /etc/nginx/

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/src/app
RUN addgroup nginx root
USER nginx

# Define environment
ENV REACT_APP_ENV "$ENV"
ENV REACT_APP_VERSION "$VERSION"

# Copy app settings
COPY package.json yarn.lock ./
RUN yarn

# Copy app sources
COPY . ./
RUN yarn build

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
