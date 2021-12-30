const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");

router.post("/", filesController.createFile);

module.exports = router;
