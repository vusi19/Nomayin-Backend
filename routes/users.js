const express = require('express');
const {
  getProfile,
  updateProfile,
  getTechnicians,
  getNearbyTechnicians,
  toggleAvailability,
  updateLocation,
} = require('../controllers/usersController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.patch('/profile', protect, updateProfile);

router.get('/technicians', getTechnicians);
router.get('/nearby', getNearbyTechnicians);

router.patch('/availability', protect, authorizeRoles('technician'), toggleAvailability);
router.patch('/location', protect, authorizeRoles('technician'), updateLocation);

module.exports = router;
