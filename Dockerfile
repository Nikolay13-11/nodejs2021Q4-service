FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

# VOLUME [ "/data" ]

CMD [ "npm", "run", "start" ]
