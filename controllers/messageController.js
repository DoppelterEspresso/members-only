const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.message_list = function (req, res, next) {
  Message.find()
    .populate("creator")
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      res.render("message_list", { message_list: list_messages });
    });
};

exports.message_create_get = function (req, res, next) {
  res.render("message_form", { title: "Create a message" });
};

exports.message_create_post = [
  body("messageTitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty")
    .escape(),
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message cannot be empty")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create Message",
        errors: errors.array(),
      });
      return;
    }
    if (!req.user) {
      res.render("message_form", {
        title: "You are not logged in!",
      });
      return;
    } else {
      const message = new Message({
        title: req.body.messageTitle,
        text: req.body.messageText,
        timestamp: Date.now(),
        creator: req.user,
      });
      message.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/"); //PLACEHOLDER
      });
    }
  },
];

exports.message_delete_get = function (req, res, next) {
  Message.findById(req.params.id)
    .populate("creator")
    .exec(function (err, message) {
      if (err) {
        return next(err);
      }
      res.render("message_delete", { message: message });
    });
};

exports.message_delete_post = function (req, res, next) {
  if (!req.user.admin_status) {
    res.redirect("/");
  } else {
    Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
};
