const Case = require('../models/caseModel');

// Create a new emergency case
exports.createCase = async (req, res) => {
    try {
        const { callerName, callerPhone, emergencyType, description, location, referralStation } = req.body;

        const newCase = new Case({
            callerName,
            callerPhone,
            emergencyType,
            description,
            location,
            referralStation,
            status: 'pending',
            dateTime: new Date()
        });

        await newCase.save();
        res.status(201).json({ success: true, data: newCase });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating case', error: error.message });
    }
};

// Retrieve all emergency cases
exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.status(200).json({ success: true, data: cases });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving cases', error: error.message });
    }
};

// Retrieve a single case by ID
exports.getCaseById = async (req, res) => {
    try {
        const caseId = req.params.id;
        const caseData = await Case.findById(caseId);

        if (!caseData) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        res.status(200).json({ success: true, data: caseData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving case', error: error.message });
    }
};

// Update an existing case
exports.updateCase = async (req, res) => {
    try {
        const caseId = req.params.id;
        const updatedData = req.body;

        const updatedCase = await Case.findByIdAndUpdate(caseId, updatedData, { new: true });

        if (!updatedCase) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        res.status(200).json({ success: true, data: updatedCase });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating case', error: error.message });
    }
};

// Delete a case
exports.deleteCase = async (req, res) => {
    try {
        const caseId = req.params.id;

        const deletedCase = await Case.findByIdAndDelete(caseId);

        if (!deletedCase) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        res.status(200).json({ success: true, message: 'Case deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting case', error: error.message });
    }
};