FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY . .

EXPOSE 3000

# next dev escuchando en todas las interfaces para que el contenedor sea accesible
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]