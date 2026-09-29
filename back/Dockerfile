FROM node:24-slim

# Herramientas de build por si algún binario nativo (bcrypt) necesita compilarse
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]