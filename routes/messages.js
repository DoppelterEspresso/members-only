var express = require("express");
var router = express.Router();
var messageController = require("../controllers/messageController");

// GET message create form
router.get("/create", messageController.message_create_get);

// POST message create form
router.post("/create", messageController.message_create_post);

module.exports = router;
