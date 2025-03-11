FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

EXPOSE 5000

ENTRYPOINT ["/bin/sh", "-c", "npx prisma migrate deploy && npm start"]