const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["customer", "technician"], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    address: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    profilePicture: String,
    rating: {
      average: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    skills: [String],
    certifications: [String],
    availability: { type: Boolean, default: true },
    earnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
