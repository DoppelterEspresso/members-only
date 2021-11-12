var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true, maxlength: 300 },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

MessageSchema.virtual("date_format").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message", MessageSchema);
