FROM nginx:1.15.8-alpine-perl

# Build args
ARG ENV

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

# Define environment
ENV REACT_APP_ENV "$ENV"

# Copy app settings
COPY package.json yarn.lock .env ./
RUN yarn

# Copy app sources
COPY . ./
RUN yarn build

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
