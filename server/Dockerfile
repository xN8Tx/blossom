FROM node:19

WORKDIR /api

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]

