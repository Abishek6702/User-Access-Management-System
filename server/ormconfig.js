require('dotenv').config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ["entities/*.js"],
  migrations: ["migrations/*.js"], 
  cli: {
    migrationsDir: "migrations"
  }
};
