FROM node:20-alpine AS base

WORKDIR /app/front-end

COPY package.json /app/front-end

RUN npm install

COPY . .

RUN npm run build
