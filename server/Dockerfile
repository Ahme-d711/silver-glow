FROM oven/bun:1 AS base

WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install --production

COPY . .

ENV NODE_ENV=production

RUN mkdir -p uploads

EXPOSE 3131

CMD ["bun", "run", "index.ts"]
