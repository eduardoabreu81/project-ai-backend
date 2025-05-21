require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: process.env.DATABASE_URL.includes('sslmode=require')
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {},
});

module.exports = sequelize;