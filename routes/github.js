const router = require('express').Router();

const { authenticate } = require('../controllers/github');

router.post('/authenticate', authenticate);

module.exports = router;
