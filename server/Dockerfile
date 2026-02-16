# Dockerfile for Silver Glow Backend

FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package*.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 3131

# Start development server with hot reload
CMD ["bun", "--watch", "index.ts"]
