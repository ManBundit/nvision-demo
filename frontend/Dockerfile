FROM node:15.8

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm rebuild node-sass    

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
