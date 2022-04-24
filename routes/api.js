const router = require("express").Router();
const auth = require("../middleware/auth");

const { register, login } = require("./../controllers/users");
const {
  getBlocks,
  createBlock,
  getBlock,
  modifyBlock,
  deleteBlock,
} = require("./../controllers/blocks");

router.post("/register", register);
router.post("/login", login);

router.get("/blocks", auth, getBlocks);
router.post("/blocks", auth, createBlock);
router.get("/blocks/:blockId", auth, getBlock);
router.put("/blocks/:blockId", auth, modifyBlock);
router.delete("/blocks/:blockId", auth, deleteBlock);

module.exports = router;
