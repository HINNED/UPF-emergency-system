// filepath: /backend-upf-ems/backend-upf-ems/src/controllers/notificationController.js

const Notification = require('../models/notificationModel');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { message, caseId, userId } = req.body;
        const notification = new Notification({ message, case: caseId, user: userId });
        await notification.save();
        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create notification', error: error.message });
    }
};

// Get all notifications for a specific user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId }).populate('case');
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve notifications', error: error.message });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        res.status(200).json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete notification', error: error.message });
    }
};