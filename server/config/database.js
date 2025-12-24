const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "love_letter",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "your_password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false, // Tắt log SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully");

    // Sync models (tạo bảng nếu chưa có)
    await sequelize.sync({ alter: false });
    console.log("✅ Database synced");
  } catch (error) {
    console.error("❌ MySQL connection error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
