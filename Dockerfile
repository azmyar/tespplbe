FROM node:22

RUN apt-get update && \
    apt-get install -y prometheus grafana

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
