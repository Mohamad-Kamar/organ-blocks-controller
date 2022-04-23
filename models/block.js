const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  blockName: { type: String, required: true },
  blockContent: { type: String },
  ownerID: { type: mongoose.SchemaType.ObjectId, required: true },
});

module.exports = mongoose.model("block", blockSchema, "blocks");
