const express = require('express');

const router = express.Router();

const ChangelogController = require('../controllers/changelogs');

// Get all changes
// 'GET' HOST_NAME/changelogs
router.get('/', ChangelogController.get_all_changes);

// Get single change by id
// 'GET' HOST_NAME/changelog/:changeId
router.get('/:changeId', ChangelogController.get_change);

// Create a new change
// 'POST' HOST_NAME/changelogs
router.post('/', ChangelogController.create_change);

module.exports = router;
