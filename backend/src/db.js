require("reflect-metadata");

const { DataSource } = require("typeorm");
const User = require("./entity/User");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
});

module.exports = AppDataSource;