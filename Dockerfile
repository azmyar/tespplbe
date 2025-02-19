FROM node:22

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]