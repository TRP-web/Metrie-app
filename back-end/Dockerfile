FROM node:20-alpine AS base

WORKDIR /app/back-end

COPY package.json /app/back-end

RUN npm install

COPY . .