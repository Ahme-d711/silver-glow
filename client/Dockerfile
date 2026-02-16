# Dockerfile for Silver Glow Frontend (Next.js)

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3030

# Start development server (for dev) or production server (for prod)
CMD ["npm", "run", "dev", "--", "-p", "3030"]
