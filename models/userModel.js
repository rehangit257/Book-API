const mongoose = require("mongoose")
// const { stringify } = require("querystring")
const validator = require("validator")
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name must required"]
    },
    email: {
        type: String,
        required: [true, "User email must required"],
        unique:true,
        index: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password must required"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        type: String,
        default: 'user',
        enum:['user', 'admin']
    },
    active: {
        type: Boolean,
        default: true,
        select:false
    },
    photo:{
      type:String,
      default:'default.jpg'
    }
})

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
  
    return resetToken;
  };
  
  userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });
userSchema.pre(/^find/,function(next){
  this.find({active:{$ne:false}})
  next()
})
  userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

  userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

  
const User = new mongoose.model('User', userSchema)


module.exports = User;