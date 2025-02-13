// server/routes/secretSanta.js
const express = require('express');
const router = express.Router();
const SecretSantaController = require('../controllers/secretSantaController');
const upload = require('../middleware/upload');

router.post('/upload-data', upload.fields([{ name: 'employees' }, { name: 'previousAssignments' }]), SecretSantaController.uploadData);
router.post('/generate-assignments', SecretSantaController.generateAssignments);
router.get('/download-assignments', SecretSantaController.downloadAssignments);

module.exports = router;