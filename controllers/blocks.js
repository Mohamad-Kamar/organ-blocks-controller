const Block = require("../models/block");
const paginatedResults = require("../middleware/pagination");

const getBlocks = [
  paginatedResults(Block),
  (req, res, next) => {
    res.json(res.paginatedResults);
  },
];

const createBlock = async (req, res) => {
  const { blockName, blockContent, isEnabled } = req.body;

  const { userId } = req.auth;

  try {
    const resultingBlock = await Block.create({
      blockName,
      blockContent,
      isEnabled,
      userId,
    });
    res.status(201).json(resultingBlock._id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const getBlock = async (req, res) => {
  const { blockId } = req.params;
  const foundBlock = await Block.findOne({ _id: blockId });
  if (!foundBlock) {
    return res.status(404).json({ error: "Block not found" });
  }
  return res.json(foundBlock);
};
const modifyBlock = async (req, res) => {
  const { blockName, blockContent, isEnabled } = req.body;
  const { userId } = req.auth;
  try {
    await Block.updateOne({ userId }, { ...req.body });
    return res.status(202);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const deleteBlock = async (req, res) => {
  const { blockId } = req.params;
  try {
    const results = await Block.deleteOne({ _id: blockId });
    const { deletedCount } = results;
    if (!deletedCount) return res.status(404).end();
    return res.status(202).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { getBlocks, createBlock, getBlock, modifyBlock, deleteBlock };
