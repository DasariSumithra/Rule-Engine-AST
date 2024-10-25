const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.post('/create', ruleController.createRule);
router.post('/combine', ruleController.combineRules); // Ensure this line is present
router.post('/evaluate', ruleController.evaluateRule);

module.exports = router;
