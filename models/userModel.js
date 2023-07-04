const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    values: [],
  },
  company: {
    type: String,
    values: [],
  },
  community: {
    type: [String],
    values: [],
  },
}, { 
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
}});

userSchema.pre("save", function (next) {
  const now = moment.tz(Date.now(), "Asia/Jakarta").format("dddd YYYY-MM-DD HH:mm:ss");
  this.created_at = now;
  this.updated_at = now;
  next();
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret){
    delete ret._id
  },
});

module.exports = mongoose.model("users", userSchema);
