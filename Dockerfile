# ==========================================
# Stage 1: Build the React + Vite Application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for efficient Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the entire project source code
COPY . .

# Build the production bundle into /app/dist
RUN npm run build

# ==========================================
# Stage 2: Serve static assets with Nginx
# ==========================================
FROM nginx:alpine AS runner

# Remove default Nginx welcome site
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration for SPA routing & compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
