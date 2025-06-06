const mongoose = require('mongoose');

const plm=require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Pinterest_Project")


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'

  }
  ],
  dp: {
    type: String,  // you can store image URL or file path here
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
