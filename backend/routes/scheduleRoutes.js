const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { authenticate, authorize } = require('../middleware/authMiddleware'); // Assuming you have this middleware

// POST /api/schedules - Create a new schedule (Admin only)
router.post('/', authenticate, authorize('admin'), scheduleController.createSchedule);

// GET /api/schedules - Get all schedules (Admin or Presenter - adjust as needed)
// Consider if presenters should only see their own schedules
router.get('/', authenticate, authorize('admin', 'presenter'), scheduleController.getAllSchedules);

// GET /api/schedules/:id - Get a single schedule by MongoDB ID (Admin or specific Presenter)
// Add logic in controller or middleware to check if presenter owns the schedule
router.get('/:id', authenticate, authorize('admin', 'presenter'), scheduleController.getScheduleById);

// GET /api/schedules/presentation/:presentationId - Get schedule by unique Presentation ID (Admin or Presenter)
router.get('/presentation/:presentationId', authenticate, authorize('admin', 'presenter'), scheduleController.getScheduleByPresentationId);

// PUT /api/schedules/:id - Update a schedule by MongoDB ID (Admin only)
router.put('/:id', authenticate, authorize('admin'), scheduleController.updateSchedule);

// DELETE /api/schedules/:id - Delete a schedule by MongoDB ID (Admin only)
router.delete('/:id', authenticate, authorize('admin'), scheduleController.deleteSchedule);

module.exports = router;