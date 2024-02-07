FROM node:19-alpine

WORKDIR /file-server

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
COPY ../server-libs/dest ./libs/database
RUN npm run build

CMD [ "npm", "run", "start" ]