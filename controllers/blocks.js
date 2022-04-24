const Block = require("../models/block");
const paginatedResults = require("../middleware/pagination");

const getBlocks = [
  paginatedResults(Thing, req.auth),
  (req, res) => {
    res.json(res.paginatedResults);
  },
];

const createBlock = async (req, res) => {};
const getBlock = async (req, res) => {};
const modifyBlock = async (req, res) => {};
const deleteBlock = async (req, res) => {};
module.exports = { getBlocks, createBlock, getBlock, modifyBlock, deleteBlock };
