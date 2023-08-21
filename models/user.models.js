var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        tracking: { type: Array, default: [] }      
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    // Check if the password field is modified
    if (this._update.password) {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the updated password with the generated salt
      const hashedPassword = await bcrypt.hash(this._update.password, salt);
      // Set the hashed password to the updated password field
      this._update.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema, 'User');