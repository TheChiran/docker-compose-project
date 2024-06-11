FROM node:18.12.0-alpine

WORKDIR /client

COPY . /client

RUN npm install

COPY . /client

EXPOSE 5173

CMD ["npm","run","dev"]