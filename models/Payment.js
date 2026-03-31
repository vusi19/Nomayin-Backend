const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    method: { type: String, default: 'card' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
