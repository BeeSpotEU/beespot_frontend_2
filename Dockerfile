FROM node:8 as builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD nginx -g "daemon off;"
