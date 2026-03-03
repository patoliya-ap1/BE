const express = require("express");
const { middleware } = require("../middleware/middleware");
const { userController } = require("../controller/userController");

const router = express.Router();

router.post("/", middleware, userController);

module.exports = router;
