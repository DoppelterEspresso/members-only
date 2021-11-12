var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 200 },
  last_name: { type: String, required: true, maxlength: 200 },
  username: { type: String, required: true, maxlength: 200 },
  password: { type: String, required: true },
  member_status: { type: Boolean, default: false },
  admin_status: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
