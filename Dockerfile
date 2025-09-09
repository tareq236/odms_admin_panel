# use nodejs LTS version
FROM node:22-alpine AS base

# set working directory
WORKDIR /app

# install OpenSSL 1.1 compatibility
RUN apk add --no-cache openssl1.1-compat

# install dependencies separately (better caching)
COPY package*.json ./
RUN npm install

# Only copy required files
COPY . .

# set DBs
RUN npx prisma generate --schema prisma/schema.prisma
RUN npx prisma generate --schema prisma/schema2.prisma
RUN npm run build

# expose port
EXPOSE 5003

# run server
CMD [ "npm", "start" ]