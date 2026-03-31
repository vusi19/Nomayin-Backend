const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    scheduledAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
