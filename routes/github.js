const { Router } = require('express');
const router = Router();

const { authenticate } = require('../controllers/github');

router.post('/authenticate', authenticate);

module.exports = router;
