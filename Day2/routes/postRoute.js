const express = require("express");
const { middleware } = require("../middleware/middleware");
const { postController } = require("../controller/postController");

const router = express.Router();

router.post("/", middleware, postController);

module.exports = router;
