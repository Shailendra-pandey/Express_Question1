// export { user, access_token, addressSc, images } from "./user";
// export { tshirt } from "./tshirt";
// export { mobile } from "./mobile";

const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operationsAliases: false,
});
