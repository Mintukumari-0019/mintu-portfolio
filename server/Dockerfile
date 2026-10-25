# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy server source code
COPY . .

# Ensure data directory exists for SQLite
RUN mkdir -p data

# Expose backend port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "src/server.js"]
