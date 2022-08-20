FROM node:14.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i sqlite3 -D && rm -rf node_modules && npm i && npm rebuild
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
