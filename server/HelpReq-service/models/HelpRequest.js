const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    location: { type: String },
    isResolved: { type: Boolean, default: false },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt
);

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
