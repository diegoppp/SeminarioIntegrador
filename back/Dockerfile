FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]