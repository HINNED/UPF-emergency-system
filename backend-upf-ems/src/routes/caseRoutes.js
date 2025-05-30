const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// Route to create a new case
router.post('/', caseController.createCase);

// Route to get all cases
router.get('/', caseController.getAllCases);

// Route to get a specific case by case number
router.get('/:caseNumber', caseController.getCaseByNumber);

// Route to update a case by case number
router.put('/:caseNumber', caseController.updateCase);

// Route to delete a case by case number
router.delete('/:caseNumber', caseController.deleteCase);

module.exports = router;