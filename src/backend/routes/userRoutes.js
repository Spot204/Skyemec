import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("users", async (rep, res) => {
  const user = new User(res.body);
  await user.save();
  res.json(user);
});
