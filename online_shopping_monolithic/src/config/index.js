const dotenv  = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if(envFound.error){
    throw new Error('Cound not find .env!');
}else{
    console.log(envFound);
}

module.exports = {
    PORT: parseInt(process.env.PORT || '8000', 10),
    DB_URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon_demo_db',
    APP_SECRET: process.env.APP_SECRET || 'jwt_secret'
}