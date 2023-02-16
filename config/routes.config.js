const express = require("express");
const router = express.Router();
const common = require("../controllers/common.controller");
const session = require("../controllers/chat.controller");

router.get("/", common.home);
router.get("/chat", session.chat);
router.post("/message", session.message);

module.exports = router;
