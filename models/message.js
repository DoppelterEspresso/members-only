var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true, maxlength: 300 },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
