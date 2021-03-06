const mongoose = require('mongoose');
const id = mongoose.Schema.Types.ObjectId;
const date = mongoose.Schema.Types.Date;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 128

    },
    token: {
      type: String
    },

    phone: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }

);

const User = mongoose.model('user', userSchema);
const Admin = mongoose.model('admin', userSchema);

module.exports = {
  User,
  Admin
};
