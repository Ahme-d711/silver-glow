# Dockerfile for Silver Glow Backend

FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package*.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the project
RUN bun build index.ts --outdir dist --target bun

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 3131

# Start production server
CMD ["bun", "dist/index.js"]
