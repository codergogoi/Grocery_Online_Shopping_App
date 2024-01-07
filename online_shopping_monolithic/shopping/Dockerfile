FROM node

WORKDIR /app/shopping

COPY package.json .

RUN npm install && npm uninstall bcrypt && npm i --save bcryptjs

COPY . .

EXPOSE 8003

CMD ["npm", "start"]