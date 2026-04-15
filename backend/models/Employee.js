const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    roll: {
      type: String,
      default: '',
      trim: true,
    },
    cls: {
      type: String,
      default: 'Math',
      enum: ['Math', 'Science', 'English', 'History', 'CS'],
    },
    sec: {
      type: String,
      default: '',
      trim: true,
    },
    grade: {
      type: String,
      default: 'A',
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'],
    },
    att: {
      type: String,
      default: '',
    },
    stat: {
      type: String,
      default: 'Active',
      enum: ['Active', 'Warning', 'Suspended'],
    },
    par: {
      type: String,
      default: '',
      trim: true,
    },
    dob: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    addr: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

// Virtual 'id' that maps to _id as string
employeeSchema.virtual('id').get(function () {
  return this._id.toString();
});

employeeSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    // Convert userId ObjectId to string
    if (ret.userId && typeof ret.userId === 'object') {
      ret.userId = ret.userId.toString();
    }
    return ret;
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
