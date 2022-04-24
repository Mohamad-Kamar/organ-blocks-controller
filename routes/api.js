
const router = require("express").Router();
const auth = require("../middleware/auth");

const { register, login } = require("./../controllers/users")
const { getBlocks, createBlock, getBlock, modifyBlock, deleteBlock } = require("./../controllers/users")


router.post("/register", register);
router.post("/login", login);

router.get("/blocks", auth, )
router.post("/blocks", auth, )
router.get("/blocks/:blockId", auth, )
router.put("/blocks/:blockId", auth, )
router.delete("/blocks/:blockId", auth, )

module.exports = router;
