# Dockerfile for Silver Glow Frontend (Next.js)

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3030

# Start production server
CMD ["npm", "start"]
