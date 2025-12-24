const express = require("express");
const router = express.Router();
const Visit = require("../models/Visit");
const { Op } = require("sequelize");

// Track visit
router.post("/track-visit", async (req, res, next) => {
  try {
    const { userAgent, referrer, screenResolution } = req.body;

    // Lấy IP address
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress ||
      "unknown";

    const newVisit = await Visit.create({
      ipAddress,
      userAgent,
      referrer: referrer || "direct",
      screenResolution,
    });

    res.status(201).json({
      success: true,
      message: "Visit tracked successfully",
      visitId: newVisit.id,
    });
  } catch (error) {
    next(error);
  }
});

// Get total visit count
router.get("/visit-count", async (req, res, next) => {
  try {
    const totalVisits = await Visit.count();

    res.json({
      success: true,
      totalVisits,
    });
  } catch (error) {
    next(error);
  }
});

// Get visits with pagination
router.get("/visits", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Visit.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      attributes: [
        "id",
        "ipAddress",
        "userAgent",
        "referrer",
        "screenResolution",
        "createdAt",
      ],
    });

    res.json({
      success: true,
      visits: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get statistics (bonus - thống kê theo ngày)
router.get("/stats", async (req, res, next) => {
  try {
    const { sequelize } = require("../config/database");

    // Thống kê 7 ngày gần nhất
    const stats = await Visit.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("created_at")), "date"],
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: {
        createdAt: {
          [Op.gte]: sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        },
      },
      group: [sequelize.fn("DATE", sequelize.col("created_at"))],
      order: [[sequelize.fn("DATE", sequelize.col("created_at")), "DESC"]],
      raw: true,
    });

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
