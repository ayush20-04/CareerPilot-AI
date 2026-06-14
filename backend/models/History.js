import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    feature: {
      type: String,
      required: true,
      enum: [
        "profile-analysis",
        "headline-optimizer",
        "about-generator",
        "skills-suggestions",
        "post-generator"
      ]
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const History = mongoose.model("History", historySchema);

export default History;
