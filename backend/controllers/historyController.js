import History from "../models/History.js";

export const getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 }).limit(25);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history.",
      error: error.message
    });
  }
};

export const deleteHistoryItem = async (req, res) => {
  try {
    const historyItem = await History.findByIdAndDelete(req.params.id);

    if (!historyItem) {
      return res.status(404).json({
        message: "History item not found."
      });
    }

    res.status(200).json({
      message: "History item deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete history item.",
      error: error.message
    });
  }
};
