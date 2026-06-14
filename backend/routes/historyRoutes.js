import express from "express";
import {
  deleteHistoryItem,
  getHistory
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getHistory);
router.delete("/:id", deleteHistoryItem);

export default router;
