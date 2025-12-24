const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Visit = sequelize.define(
  "Visit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "ip_address",
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "user_agent",
    },
    referrer: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    screenResolution: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "screen_resolution",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "visits",
    timestamps: false, // Không dùng updatedAt
    indexes: [
      {
        name: "idx_created_at",
        fields: ["created_at"],
      },
    ],
  }
);

module.exports = Visit;
