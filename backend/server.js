import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "CareerPilot AI backend is running."
  });
});

app.use("/api/ai", aiRoutes);
app.use("/api/history", historyRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found."
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Please stop the process occupying this port or set a different PORT in your .env file.`);
    process.exit(1);
  }
  console.error(error);
  process.exit(1);
});
