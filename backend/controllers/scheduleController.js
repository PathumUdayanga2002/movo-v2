const Schedule = require('../models/schedule');
const User = require('../models/user');
const mongoose = require('mongoose');
const crypto = require('crypto'); // For generating unique presentation IDs
const { sendScheduleEmail } = require('../utils/email'); // Assuming an email utility exists

// Helper function to generate a unique presentation ID
const generatePresentationId = () => {
    return crypto.randomBytes(4).toString('hex'); // Generates an 8-character hex string
};

// Create a new schedule
exports.createSchedule = async (req, res) => {
    try {
        const { presenterEmail, title, description, dateTime, duration } = req.body;

        // Find the presenter user by email
        const presenter = await User.findOne({ email: presenterEmail, role: 'presenter' });
        if (!presenter) {
            return res.status(404).json({ message: 'Presenter not found or is not assigned the presenter role.' });
        }

        // Generate a unique presentation ID
        let presentationId = generatePresentationId();
        let existingSchedule = await Schedule.findOne({ presentationId });
        while (existingSchedule) { // Ensure uniqueness
            presentationId = generatePresentationId();
            existingSchedule = await Schedule.findOne({ presentationId });
        }

        const newSchedule = new Schedule({
            presenter: presenter._id,
            title,
            description,
            dateTime,
            duration,
            presentationId
        });

        await newSchedule.save();

        // Send schedule email
        try {
            await sendScheduleEmail(presenter.email, { title, description, dateTime, duration, presentationId });
        } catch (emailError) {
            console.error("Failed to send schedule email:", emailError);
            // Log the error but don't fail the request just because email failed
            // Optionally, you could add a status to the response indicating email failure
        }

        res.status(201).json({ message: 'Presentation scheduled successfully', schedule: newSchedule });
    } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(500).json({ message: 'Error creating schedule', error: error.message });
    }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('presenter', 'name email'); // Populate presenter details
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules', error: error.message });
    }
};

// Get a single schedule by ID (MongoDB _id)
exports.getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid schedule ID format' });
        }
        const schedule = await Schedule.findById(id).populate('presenter', 'name email');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error: error.message });
    }
};

// Get a single schedule by Presentation ID
exports.getScheduleByPresentationId = async (req, res) => {
    try {
        const { presentationId } = req.params;
        const schedule = await Schedule.findOne({ presentationId }).populate('presenter', 'name email');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found for the given Presentation ID' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule by Presentation ID', error: error.message });
    }
};


// Update a schedule by ID
exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid schedule ID format' });
        }

        // If presenterEmail is updated, find the new presenter's ID
        if (updates.presenterEmail) {
            const presenter = await User.findOne({ email: updates.presenterEmail, role: 'presenter' });
            if (!presenter) {
                return res.status(404).json({ message: 'New presenter not found or is not assigned the presenter role.' });
            }
            updates.presenter = presenter._id;
            delete updates.presenterEmail; // Remove email from updates object
        }

        const updatedSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true }).populate('presenter', 'name email');

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // TODO: Optionally send an update email

        res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule', error: error.message });
    }
};

// Delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid schedule ID format' });
        }

        const deletedSchedule = await Schedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // TODO: Optionally send a cancellation email

        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting schedule', error: error.message });
    }
};