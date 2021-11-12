var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET User sign up form
router.get("/sign-up", userController.user_create_get);

// POST User sign up form
router.post("/sign-up", userController.user_create_post);

// GET User log in form
router.get("/log-in", userController.user_login_get);

// POST User log in form
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failuerRedirect: "/",
  })
);

router.get("/log-out", userController.user_log_out);

module.exports = router;
