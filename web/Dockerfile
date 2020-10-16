FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm i -g serve
CMD ["sh", "-c", "serve -s build -l $UI_PORT"]