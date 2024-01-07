FROM node

WORKDIR /app/product

COPY package.json .

RUN npm install && npm uninstall bcrypt && npm i --save bcryptjs

COPY . .

EXPOSE 8002

CMD ["npm", "start"]