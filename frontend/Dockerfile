FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build \
  && rm -rf ./src \
  && rm -rf node ./node_modules

FROM nginx:1.23.1-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci


CMD ["npm", "run", "start"]