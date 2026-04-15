const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // ✅ Email
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    // ✅ Phone
    phone: {
      type: String,
      default: '',
      trim: true,
    },

    // 🔐 Password (hashed)
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // 🔥 password return ஆகாது
    },

    // 🧪 Demo user check
    isDemo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔐 Password hash before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Compare password (login use)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔥 Remove sensitive fields in response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password; // ❌ hide password
  obj.id = obj._id.toString();

  delete obj._id;
  delete obj.__v;

  return obj;
};

module.exports = mongoose.model('User', userSchema);