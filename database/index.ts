import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.sql",
  dialectModule: sqlite3,
});

export default sequelize;
