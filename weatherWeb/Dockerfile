FROM node:20-alpine AS build-env

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# NGINX stage
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-env /app/dist/weather-web/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
