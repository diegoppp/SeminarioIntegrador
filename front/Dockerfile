FROM node:22-slim

# Herramientas de build por si algún binario nativo necesita compilarse
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

# next dev escuchando en todas las interfaces para que el contenedor sea accesible
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]