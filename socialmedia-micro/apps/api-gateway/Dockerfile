FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./
COPY apps/api-gateway/tsconfig.app.json apps/api-gateway/
COPY tsconfig.json ./
COPY nest-cli.json ./


RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm run build api-gateway

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy the built application
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "dist/apps/api-gateway/main"]