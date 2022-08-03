FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ] 
# OR ENTRYPOINT [ "npm", "run", "start" ] can be used instead of CMD
