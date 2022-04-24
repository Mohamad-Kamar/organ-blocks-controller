const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  blockName: { type: String, required: true },
  blockContent: { type: String },
  isEnabled: { type: Boolean },
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
});

module.exports = mongoose.model("block", blockSchema, "blocks");
