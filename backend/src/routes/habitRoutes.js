const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/', habitController.getHabits);
router.post('/', habitController.createHabit);
router.get('/:id', habitController.getHabitById);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

// Check-in
router.post('/:id/checkin', habitController.checkIn);

module.exports = router;
