const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configure the email transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS  // Your email password or app password from .env
    }
});

/**
 * Sends a presentation schedule email to the presenter.
 * @param {string} recipientEmail - The email address of the presenter.
 * @param {object} scheduleDetails - Details of the schedule.
 * @param {string} scheduleDetails.title - Title of the presentation.
 * @param {string} [scheduleDetails.description] - Description of the presentation.
 * @param {Date} scheduleDetails.dateTime - Date and time of the presentation.
 * @param {number} scheduleDetails.duration - Duration in minutes.
 * @param {string} scheduleDetails.presentationId - Unique ID for joining the presentation room.
 */
const sendScheduleEmail = async (recipientEmail, scheduleDetails) => {
    const { title, description, dateTime, duration, presentationId } = scheduleDetails;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `Presentation Scheduled: ${title}`,
        html: `
            <h1>Presentation Scheduled</h1>
            <p>Hello,</p>
            <p>You have been scheduled for a presentation with the following details:</p>
            <ul>
                <li><strong>Title:</strong> ${title}</li>
                ${description ? `<li><strong>Description:</strong> ${description}</li>` : ''}
                <li><strong>Date & Time:</strong> ${new Date(dateTime).toLocaleString()}</li>
                <li><strong>Duration:</strong> ${duration} minutes</li>
                <li><strong>Presentation ID:</strong> ${presentationId}</li>
            </ul>
            <p>Please use the Presentation ID to join the presentation room at the scheduled time.</p>
            <p>Best regards,</p>
            <p>MOVO Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Schedule email sent successfully to ${recipientEmail}`);
    } catch (error) {
        console.error(`Error sending schedule email to ${recipientEmail}:`, error);
        throw new Error('Failed to send schedule email.'); // Re-throw to allow controller to handle
    }
};

module.exports = { sendScheduleEmail };