import DrSchedule from "../model/DrSchedule.js";

router.get("/drschedule", async (req, res) => {
  try {
    const data = await DrSchedule.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
