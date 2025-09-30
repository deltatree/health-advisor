# Multi-stage Dockerfile für VR-StarterKonto Web-App
# Kombiniert React Frontend und Node.js Backend in einem Container

# Stage 1: Frontend Build
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Frontend Dependencies installieren
COPY frontend/package*.json ./
RUN npm ci --only=production

# Frontend Source kopieren und builden
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend Setup
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Backend Dependencies installieren
COPY backend/package*.json ./
RUN npm ci --only=production

# Backend Source kopieren
COPY backend/ ./

# Stage 3: Production Image mit Nginx
FROM nginx:alpine AS production

# System Dependencies
RUN apk add --no-cache nodejs npm supervisor

# Create supervisor log directory
RUN mkdir -p /var/log/supervisor

# Nginx Konfiguration kopieren
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Backend Setup im Production Container
WORKDIR /app/backend
COPY --from=backend-builder /app/backend ./

# Frontend Build-Ausgabe zu Nginx
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Supervisor Konfiguration für Multi-Process Management
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Health Check Script
COPY docker/healthcheck.sh /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

# Ports freigeben
EXPOSE 80 3001

# Health Check konfigurieren
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# Supervisor als Hauptprozess
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Metadata
LABEL org.opencontainers.image.title="VR-StarterKonto Web-App"
LABEL org.opencontainers.image.description="Interaktive Web-App für das VR-StarterKonto mit Health-Bonus Features"
LABEL org.opencontainers.image.vendor="VR Bank"
LABEL org.opencontainers.image.licenses="MIT"