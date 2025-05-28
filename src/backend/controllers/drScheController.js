const Schedule = require("../models/scheduleModel");

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSchedules };
