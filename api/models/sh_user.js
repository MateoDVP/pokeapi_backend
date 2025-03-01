const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  Validación de email
  },
  password: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  type: {
      type: String,
      default: 'user'
  },
  status: {
      type: String,
      default: 'active'
  }
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(timestamps);

module.exports = mongoose.model('sh_user', userSchema);