FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies with caching
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose API port
EXPOSE 5000

# Container healthcheck
HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/healthz || exit 1

# Start CivicPulse API
CMD ["node", "server.js"]
