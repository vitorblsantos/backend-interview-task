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
ENV CAVEO_DEFAULT_PASSWORD=Caveo@2024
ENV COGNITO_CLIENT_ID="1umo3njvmm0cl00ud7hpk3hoog"
ENV COGNITO_REGION="us-east-2"
ENV COGNITO_USER_POOL_ID="us-east-2_DMDaCuZl2"
ENV NODE_ENV="development"
ENV POSTGRES_DB="caveo-database"
ENV POSTGRES_HOST="localhost"
ENV POSTGRES_PASSWORD="caveo@2024"
ENV POSTGRES_PORT="5432"
ENV POSTGRES_USER="postgres"
ENV SERVICE_ACCOUNT='{"type":"service_account","project_id":"vitorblsantos","private_key_id":"d21e0f22f0d727957e8c88127ce7cc5ea672de6d","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyy1mhWa0yaa3B\nWvE2P++OD5ybUu/YdGlQcHW12ulos22HpZIZzjVWe3qcoikeN/P5SzQM4Q2WhyIn\n/SOYaoVVdFJedR9vMV/3VE8nnKYCzxMmTIDE6L1AwDZK1EwXZ46e8cEbXQKkCgGa\nEvNYRf0TkqNuclyfHY2x8rsUWbDoGnUlq4y9AzNDdIppzj9vO/ZfFvJaI58eVVZW\nBUPLbHI7wvEeP6OYEWsjVuFApEDiey76oXfuhHIi8Nw55dqB5UBc6NXVav5EB1Il\n3RVYV3t6qPmP2IukklRNj3CmflxfMv51jAHit20yUCv+ek6REOGm5y/PpFGo2ptj\njBAUIzplAgMBAAECggEABlLm8qwHUjcmrCYZTf/o6y9mLKA8V32Wk//GSg5aHxfp\nkdirWDpQ7KQlbBDYP3dfK7wbNTFol6Bj9uIfNi7eVG1u1GR0Hiyy5j6XJiGGRacp\nWDtweoZ42ydxRChKILHK+5g1alBZ3Y91CwwMi1y+XMjc+vUUjZQwBNE/CLM7bJoj\n0GZtaVPlXc6q6a6vDPuXorDwg7qpxCSmu87jd4R6csFL3yugo0jl6UU+8yzYu8la\nRDuO8xw91bBT8vNRqzSUC5egm54BPM+0CT10jhyN0AlTbul4XhucDHFP/m6VdKj3\njJgDMHdBQiRnuy4g/Vu5DvGCS3VsK0Pgl+HPiEinwQKBgQDfqoVjpVL5tBHdgeAX\nKTeY2Yjteum8kDN1RIK8Or+NHlcW3Rj1La2/vZe8G8IQh0uBjFGEsN3ZpGniru78\nOCO4dn8VanyX24SzUK9kxklHRWqradUQqIMwXzk5hbnnZDPA9946gsRD/U/YLFfX\nk/EBu0R3AVCKoH5U3wWkowjL7QKBgQDMpDTCaQx53nTtzlpOvlNfQebmiZ2OwKry\n6LBU8FKPDm39/Eq0uGlHww0XZyuH+cTEAaidBhQMPjux1iT2v3UwaabpzkJ2ACak\nB5hlvXJFXxW4zqqLmOLycrbpoJfaAZOmBAW2iPwG0PrRxK0oogsQ4dqwTj9/ZD3P\nRN3z720JWQKBgBmjGhcJ5DDrCwEw2dbNyqmihady50fN35gZekLJGRu71o+wWCQC\nUGAiAzp0lBIA8A6xXsau3z8LMXfiRVJzvORv8LEru4xMhTFoljIe6FdbBZcQUnPO\nXPs2bwDA60YynhwITVi3lHeWmYhVzNvRAVcJeBeL9wdszg48YhE0/tUhAoGAWDVb\njIUtXIaYDj1JTfHaDBBjD/I3mOXRifzkrOgeHg3ROY57QSTQNJ+N0A2nhOgTeY1h\nebW6BID6yDAPJNDoGaMg0F0Y5rYv8bpYZVpgnChdO5jRiHSxNmJeF5wieFT/qKrJ\nL6IiSGniA3NsVDxs2q0Pz7kaw7WYsvPzXAdTD5kCgYEA0eT1mpTzLk0k+67nSQYY\nnQE9odfseJAxO+Jq4P+IQLWr3ntWwfK7O5hfRKR1yNzwx0b2h10tkiwZRSEnr4Y4\nRT2Jwmqlo234P9wwmwvTz3CXgD1drkoiVXDqYnmKfvziJRHiYgBH/QRohy9wRN2H\nXa9GWIXApuXmclwhK8RNNzQ=\n-----END PRIVATE KEY-----\n","client_email":"caveo-bff@vitorblsantos.iam.gserviceaccount.com","client_id":"106594732266721472136","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/caveo-bff%40vitorblsantos.iam.gserviceaccount.com","universe_domain":"googleapis.com" }'

EXPOSE 8080

CMD ["node", "./dist/index.js"]
