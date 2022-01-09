FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /app/src

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "run", "start" ]
