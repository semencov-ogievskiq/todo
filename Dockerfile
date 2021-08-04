FROM node:12.2.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @vue/cli -g

CMD ["npm", "run", "serve"]