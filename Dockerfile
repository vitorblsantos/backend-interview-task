### ETAPA 1 - BUILD
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

RUN npm run build

### ETAPA 2 - START

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

EXPOSE 8080

CMD ["node", "./dist/index.js"]
