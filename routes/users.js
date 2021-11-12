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

// GET User membership update form
router.get("/member", userController.user_update_get);

// POST User membership update form
router.post("/member", userController.user_update_post);

// GET User admin update form
router.get("/admin", userController.user_admin_get);

// POST User admin uodate form
router.post("/admin", userController.user_admin_post);

router.get("/log-out", userController.user_log_out);

module.exports = router;
