### ETAPA 1 - BUILD
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production
RUN yarn cache clean

COPY . .

RUN npm run build

### ETAPA 2 - START

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

ENV APP_PORT="8080"
ENV NODE_ENV="development"
ENV POSTGRES_DB="caveo-database"
ENV POSTGRES_HOST="localhost"
ENV POSTGRES_PASSWORD="toor"
ENV POSTGRES_PORT="5432"
ENV POSTGRES_USER="root"

EXPOSE 8080

CMD ["node", "./dist/index.js"]
