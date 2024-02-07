FROM node:19-alpine as prod

WORKDIR /client

COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

## NGINX
FROM nginx
COPY --from=prod /client/dist /usr/share/nginx/html
COPY --from=prod /client/nginx.conf /etc/nginx/
