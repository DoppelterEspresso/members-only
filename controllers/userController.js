const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

//exports.user_list

exports.user_create_get = function (req, res, next) {
  res.render("user_form", { title: "Sign Up" });
};

exports.user_create_post = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .escape(),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .escape(),
  body("username").isEmail().normalizeEmail(),
  body("password")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
  body("confirmPassword").custom(
    (value, { req }) => value === req.body.password
  ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("user_form", {
        title: "Sign Up failed",
        errors: errors.array(),
      });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          username: req.body.username,
          password: hashedPassword,
        });
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  },
];

exports.user_login_get = function (req, res, next) {
  res.render("login_form", { title: "Log in" });
};

exports.user_log_out = function (req, res, next) {
  req.logout();
  res.redirect("/");
};

exports.user_update_get = function (req, res, next) {
  if (req.user) {
    res.render("member_form", { user: req.user, title: "Membership" });
  } else {
    res.redirect("/users/log-in");
  }
};

exports.user_update_post = [
  body("memberPassword").trim().escape(),

  (req, res, next) => {
    if (req.body.memberPassword === process.env.MEMBER_PASSWORD) {
      User.findByIdAndUpdate(
        req.user._id,
        { member_status: true },
        function (err, theUser) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        }
      );
    } else {
      res.render("member_form", { title: "Wrong Password!" });
    }
  },
];

exports.user_admin_get = function (req, res, next) {
  if (req.user) {
    res.render("admin_form", { title: "Admin" });
  } else {
    res.redirect("/users/log-in");
  }
};

exports.user_admin_post = [
  body("adminPassword").trim().escape(),

  (req, res, next) => {
    if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
      User.findByIdAndUpdate(
        req.user._id,
        { admin_status: true },
        function (err, theUser) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        }
      );
    } else {
      res.render("admin_form", { title: "Wrong Password!" });
    }
  },
];
