const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: true, // must be provided
  },

  fullName: {
    type: String,
    required: true, // must be provided
  },

  // Available departments that the user can belong to
  department: {
    type: String,
    values: [],
  },

  // Available companies that the user can work for
  company: {
    type: String,
    values: [],
  },

  // Available community that the user can improve their skill for
  community: {
    type: [String],
      values: [],
  },
});

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret){
        delete ret._id
    },
});

module.exports = mongoose.model("users", userSchema);
