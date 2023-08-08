FROM node:latest

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]
