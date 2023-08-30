FROM node:18-slim as builder

RUN npm install -g pnpm@8.6.12

WORKDIR /app

COPY package.json package-lock.json ./

RUN pnpm install

COPY . .

RUN pnpm build


FROM nginx:alpine as runner

EXPOSE 8080

RUN mkdir /etc/nginx/logs

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


