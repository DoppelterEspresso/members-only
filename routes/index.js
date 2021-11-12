var express = require("express");
var router = express.Router();
var messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.message_list);

module.exports = router;
