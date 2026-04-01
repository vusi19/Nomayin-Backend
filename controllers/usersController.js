const User = require('../models/User');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  profilePicture: user.profilePicture,
  location: user.location,
  skills: user.skills,
  isAvailable: user.isAvailable,
  rating: user.rating,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

exports.getProfile = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
};

exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'phone', 'profilePicture'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(400).json({ message: 'Profile update failed', error: error.message });
  }
};

exports.getTechnicians = async (_req, res) => {
  try {
    const technicians = await User.find({ role: 'technician' }).select('-password');
    return res.status(200).json({ count: technicians.length, technicians: technicians.map(sanitizeUser) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch technicians', error: error.message });
  }
};

exports.getNearbyTechnicians = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const latitude = Number(lat);
    const longitude = Number(lng);
    const radiusMeters = Number(radius);

    if ([latitude, longitude, radiusMeters].some((v) => Number.isNaN(v))) {
      return res.status(400).json({ message: 'lat, lng, and radius query parameters are required numbers' });
    }

    const technicians = await User.find({
      role: 'technician',
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusMeters,
        },
      },
    }).select('-password');

    return res.status(200).json({ count: technicians.length, technicians: technicians.map(sanitizeUser) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch nearby technicians', error: error.message });
  }
};

exports.toggleAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    if (typeof isAvailable !== 'boolean') {
      return res.status(400).json({ message: 'isAvailable must be a boolean' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isAvailable },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update availability', error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const latitude = Number(lat);
    const longitude = Number(lng);

    if ([latitude, longitude].some((v) => Number.isNaN(v))) {
      return res.status(400).json({ message: 'lat and lng must be valid numbers' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update location', error: error.message });
  }
};
