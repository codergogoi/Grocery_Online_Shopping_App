FROM node

WORKDIR /app/customer

COPY package.json .

RUN npm install && npm uninstall bcrypt && npm i --save bcryptjs

COPY . .

EXPOSE 8001

CMD ["npm", "start"]