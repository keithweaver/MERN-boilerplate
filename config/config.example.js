// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  db: process.env.MONGODB_URL_DB,
  db_dev: process.env.MONGODB_URL_DB_DEV,
};
