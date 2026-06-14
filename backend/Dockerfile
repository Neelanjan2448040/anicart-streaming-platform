FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update -y && apt-get install -y openssl
COPY . .
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "run", "dev"]
