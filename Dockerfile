# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, not read at runtime.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
# Server-only (not inlined into the client bundle) — lets build-time/SSR fetches reach the
# backend over the Docker network by container name, avoiding hairpin-NAT on the public IP.
ARG API_INTERNAL_URL
ENV API_INTERNAL_URL=${API_INTERNAL_URL}

RUN npm run build

# --- production runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ARG API_INTERNAL_URL
ENV API_INTERNAL_URL=${API_INTERNAL_URL}

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3005
ENV PORT=3005
CMD ["node", "server.js"]
